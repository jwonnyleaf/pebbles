import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
  name: string;
  email: string;
  password: string;
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
