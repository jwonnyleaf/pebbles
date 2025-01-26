import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import UserModel from './models/UserModel';
import authenticateToken from './utils/AuthenticateToken';

dotenv.config();
const { MONGO_URL, PORT } = process.env;

const app = express();

mongoose
  .connect(MONGO_URL!, {})
  .then(() => {
    console.log('MongoDB is connected successfully');
  })

  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://pebbles-client.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/', routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
