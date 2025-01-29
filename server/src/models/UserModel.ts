import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  balance: number;
  petName: string;
  equippedItems: {
    itemID: Types.ObjectId;
  }[];
  inventory: {
    itemID: Types.ObjectId;
    obtainedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: [true, 'Your name is required'] },
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Your password is required'] },
  avatar: { type: String, default: 'https://i.imgur.com/6VBx3io.png' },
  balance: { type: Number, default: 0 },
  petName: { type: String, default: 'Pebbles' },
  equippedItems: [
    {
      itemID: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    },
  ],
  inventory: [
    {
      itemID: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      obtainedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

userSchema.pre('save', async function () {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;
