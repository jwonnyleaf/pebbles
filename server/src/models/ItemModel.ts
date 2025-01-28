import mongoose from 'mongoose';

export interface IItem extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const itemSchema = new mongoose.Schema<IItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

export const Item = mongoose.model<IItem>('Item', itemSchema);
