import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.create({ name, email, password });

    res.status(201).send({ message: 'User Registered', user });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign(
      { id: user!._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h',
      }
    );
    res.status(200).send({ message: 'User Successfully Logged In', token });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
