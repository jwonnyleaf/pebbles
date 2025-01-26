import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface User extends JwtPayload {
      id: string;
    }

    export interface Request {
      user?: User;
    }
  }
}
