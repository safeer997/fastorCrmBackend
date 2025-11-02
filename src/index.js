import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://fastorcrmfrontend.onrender.com'],
    credentials: true,
  })
);

//importing here for own readiablity !!
import userRoutes from './routes/user.route.js';
import leadRoutes from './routes/lead.route.js';
app.use('/api/user', userRoutes);
app.use('/api/lead', leadRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port:${PORT}`);
});
