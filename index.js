import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './route/book.route.js';
import userRouter from './route/user.roure.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let cachedConnection = null;

async function connectToMongoDB() {
  if (cachedConnection) return cachedConnection;

  cachedConnection = await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "readyforread_db",
  });

  console.log("MongoDB connected");
  return cachedConnection;
}

app.use(async (req, res, next) => {
  await connectToMongoDB();
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

app.use("/book", bookRoute);
app.use("/user", userRouter);

export default app;
