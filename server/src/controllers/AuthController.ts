import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send({ message: 'Invalid Credentials' });
      return;
    }
    const token = jwt.sign(
      { id: user!._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h',
      }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ message: 'Logged in successfully', user });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const verifySession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ isAuthenticated: false });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await UserModel.findById(
        (decoded as JwtPayload & { id: string }).id
      );
      if (!user) {
        res.status(401).send({ isAuthenticated: false });
        return;
      }
      res.send({ isAuthenticated: true, user });
    } else {
      res.status(401).send({
        isAuthenticated: false,
        message: 'Token structure is incorrect',
      });
    }
  } catch (error) {
    res.status(401).send({ isAuthenticated: false });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out successfully' });
};

export const getUserBalance = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findById(userID).select('balance');
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    res.status(200).send({ balance: user.balance });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const updateUserBalance = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { delta } = req.body;

    if (typeof delta !== 'number') {
      res.status(400).send({ message: 'Delta must be a number' });
      return;
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    user.balance = (user.balance || 0) + delta;
    await user.save();

    res.status(200).send({ message: 'Balance updated successfully', user });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
