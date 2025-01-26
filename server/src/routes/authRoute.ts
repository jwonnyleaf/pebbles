import express from 'express';
import { login, register, verifySession } from '../controllers/AuthController';

const router = express.Router();

interface LoginRequestBody {
  email: string;
  password: string;
}

router.post('/register', register);
router.post('/login', login);
router.get('/verify-session', verifySession);

export default router;
