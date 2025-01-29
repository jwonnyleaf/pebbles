import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const { MONGO_URL, PORT } = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://pebbles-client.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
});

mongoose
  .connect(MONGO_URL!, {})
  .then(() => {
    console.log('MongoDB is connected successfully');
  })

  .catch((err) => console.error(err));

const allowedOrigins = [
  'http://localhost:5173',
  'https://pebbles-client.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/images', express.static('public/images'));
app.use('/api/', routes);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (userId) => {
    console.log(`User ${userId} joined`);
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export const emitBalanceUpdate = (userID: string, balance: number) => {
  io.to(userID).emit('balance-update', balance);
};

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
