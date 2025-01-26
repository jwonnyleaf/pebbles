import express from 'express';
import {
  login,
  register,
  verifySession,
  logout,
  getUserBalance,
} from '../controllers/AuthController';
import {
  createTransaction,
  getTransactions,
} from '../controllers/TransactionController';

const router = express.Router();

interface LoginRequestBody {
  email: string;
  password: string;
}

router.post('/register', register);
router.post('/login', login);
router.get('/verify-session', verifySession);
router.post('/logout', logout);
router.get('/balance/:userID', getUserBalance);
router.post('/transact', createTransaction);
router.get('/transact/:userID', getTransactions);

export default router;
