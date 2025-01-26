import { User, AuthContextType } from '../types';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

const defaultAuthContext = {
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => {},
  loading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/verify-session', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated) {
            const dataUser = {
              id: data.user._id,
              ...data.user,
            };
            setUser(dataUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to verify session:', error);
      } finally {
        await delay(500);
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        const dataUser = {
          id: data.user._id,
          ...data.user,
        };
        setUser(dataUser);
        setIsAuthenticated(true);
        console.log(data);
        return true;
      } else {
        throw new Error(data.message || 'Failed to log in');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
