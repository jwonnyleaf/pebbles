import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const { MONGO_URL, PORT } = process.env;

const app = express();

mongoose
  .connect(MONGO_URL!, {})
  .then(() => console.log('MongoDB is connected successfully'))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ['http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/', authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
