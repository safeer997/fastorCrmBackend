import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port:${PORT}`);
});
