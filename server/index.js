import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from "./routes/postRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/dalle', dalleRoutes);
app.use('/api/posts', postRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT} https://snapai.onrender.com`));
  } catch (error) {
    console.log(error);
  }
};

startServer();