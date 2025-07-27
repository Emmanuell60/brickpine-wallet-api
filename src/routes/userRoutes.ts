import express from 'express';
import { users, User } from '../data/store';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const id = randomUUID();
  const newUser: User = { id, name, balance: 0, transactions: [] };
  users[id] = newUser;

  res.status(201).json(newUser);
});

export default router;
