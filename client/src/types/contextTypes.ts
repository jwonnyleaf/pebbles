import { User } from './authTypes';

export interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
