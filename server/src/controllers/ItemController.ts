import { Request, RequestHandler, Response } from 'express';
import { Item } from '../models/ItemModel';
import UserModel from '../models/UserModel';
import { emitBalanceUpdate } from '..';

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Failed to Fetch Items...' });
  }
};

export const getItemDetails = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  try {
    const item = await Item.findById(itemID);
    if (!item) {
      res.status(404).json({ error: 'Item Not Found' });
      return;
    }
    res.json(item);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Failed to Fetch Item Details..' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, price, description, image } = req.body;
  try {
    const newItem = new Item({ name, price, description, image });
    await newItem.save();
    res.json(201).json(newItem);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: `Failed to Create Item ${name}` });
  }
};

export const buyItem = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  const { userID } = req.body;
  try {
    // Check User Exists
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(404).json({ error: 'User Not Found' });
      return;
    }

    // Check Item Exists
    const item = await Item.findById(itemID);
    if (!item) {
      res.status(404).json({ error: 'Item Not Found' });
      return;
    }

    // Check User Balance
    if (user.balance < item.price) {
      res.status(400).json({ error: 'Insufficient Balance' });
      return;
    }

    // Update User Balance
    user.balance -= item.price;
    await user.save();
    emitBalanceUpdate(userID, user.balance);
    res.json({ message: 'Item Purchased Successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Failed to Purchase Item...' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  const { name, price, description, image } = req.body;

  try {
    const item = await Item.findById(itemID);
    if (!item) {
      res.status(404).json({ error: 'Item Not Found' });
      return;
    }

    item.name = name;
    item.price = price;
    item.description = description;
    item.image = image;
    await item.save();
    res.json(item);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Failed to Update Item...' });
  }
};

export const deleteItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { itemID } = req.params;
  try {
    const item = await Item.findById(itemID);
    if (!item) {
      res.status(404).json({ error: 'Item Not Found' });
      return;
    }
    await Item.findByIdAndDelete(itemID);
    res.status(200).json({ message: 'Item Deleted Successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Failed to Delete Item...' });
  }
};
