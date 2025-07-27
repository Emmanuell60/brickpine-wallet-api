import express from 'express';
import { users } from '../data/store';

const router = express.Router();

router.get('/:userId/transactions', (req, res) => {
  const { userId } = req.params;
  const user = users[userId];
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ transactions: user.transactions });
});

export default router;
