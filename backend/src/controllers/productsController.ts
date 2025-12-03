import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM products'); // Ensure the table exists
    res.json(result.rows);
  } catch (err) {
    console.error('GET /products error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST a new product
router.post('/', async (req: Request, res: Response) => {
  // Safely destructure req.body and provide defaults
  const { name, price } = req.body || {};

  // Basic validation
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Product name is required and must be a string' });
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ error: 'Product price is required and must be a number' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /products error:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

export default router;
