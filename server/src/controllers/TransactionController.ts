import { Request, Response } from 'express';
import TransactionModel from '../models/TransactionModel';
import UserModel from '../models/UserModel';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userID, amount, type } = req.body;

    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const transaction = await TransactionModel.create({
      user: user._id,
      amount,
      type,
    });

    res.status(201).send({ message: 'Transaction Created', transaction });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const transactions = await TransactionModel.find({ user: user._id });
    res.status(200).send(transactions);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
