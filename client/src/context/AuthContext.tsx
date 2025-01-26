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
  login: () => {},
  logout: () => {},
  loading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

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
            setUser(data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to verify session:', error);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
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
