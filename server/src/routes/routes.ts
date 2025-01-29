import express from 'express';
import {
  login,
  register,
  verifySession,
  logout,
  getUserBalance,
  updateUserBalance,
  getUserInventory,
} from '../controllers/AuthController';
import {
  createTransaction,
  getTransactions,
} from '../controllers/TransactionController';
import {
  getAllItems,
  getItemDetails,
  createItem,
  updateItem,
  deleteItem,
  buyItem,
} from '../controllers/ItemController';

import { validateRequest } from '../middleware/validateRequest';
import { itemSchema } from '../validations/itemValidation';

const router = express.Router();

interface LoginRequestBody {
  email: string;
  password: string;
}

router.post('/register', register);
router.post('/login', login);
router.get('/verify-session', verifySession);
router.post('/logout', logout);
router.post('/transact', createTransaction);
router.get('/transact/:userID', getTransactions);

/* User Routes */
router.get('/balance/:userID', getUserBalance);
router.patch('/user/:userID/balance', updateUserBalance);
router.get('/user/:userID/inventory', getUserInventory);

/* Item Routes */
router.get('/items', getAllItems);
router.get(
  '/items/:itemID',
  validateRequest(itemSchema, 'params'),
  getItemDetails
);
router.post('/items', validateRequest(itemSchema, 'body'), createItem);
router.post('/items/:itemID/buy', buyItem);
router.put(
  '/items/:itemID',
  validateRequest(itemSchema, 'params'),
  validateRequest(itemSchema, 'body'),
  updateItem
);
router.delete(
  '/items/:itemID',
  validateRequest(itemSchema, 'params'),
  deleteItem
);

export default router;
