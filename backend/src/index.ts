import express from 'express';
import dotenv from 'dotenv';
import pool from './db';
import productsRouter from './controllers/productsController';
import cors from 'cors'; // <--- import cors

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/products', productsRouter);

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected!');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
  console.log(`Server running on http://localhost:${port}`);
});
