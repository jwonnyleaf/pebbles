import mongoose from 'mongoose';

interface Transaction {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  amount: number;
  type: string;
}

const transactionSchema = new mongoose.Schema<Transaction>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Name is required'] },
    amount: { type: Number, required: [true, 'Amount is required'] },
    type: { type: String, required: [true, 'Type is required'] },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model<Transaction>(
  'Transaction',
  transactionSchema
);

export default TransactionModel;
