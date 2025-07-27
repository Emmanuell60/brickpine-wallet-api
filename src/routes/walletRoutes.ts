import express from 'express';
import { users, Transaction } from '../data/store';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/fund', (req, res) => {
  const { userId, amount } = req.body;
  const user = users[userId];
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  user.balance += amount;

  const tx: Transaction = {
    id: randomUUID(),
    type: 'fund',
    amount,
    date: new Date().toISOString()
  };
  user.transactions.push(tx);

  res.json({ message: 'Wallet funded', balance: user.balance });
});

router.post('/transfer', (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  const sender = users[fromUserId];
  const receiver = users[toUserId];

  if (!sender || !receiver) return res.status(404).json({ error: 'User not found' });
  if (fromUserId === toUserId) return res.status(400).json({ error: 'Cannot transfer to self' });
  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
  if (sender.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

  sender.balance -= amount;
  receiver.balance += amount;

  const txId = randomUUID();
  const date = new Date().toISOString();

  const senderTx: Transaction = {
    id: txId,
    type: 'transfer',
    amount,
    to: toUserId,
    date
  };

  const receiverTx: Transaction = {
    id: txId,
    type: 'transfer',
    amount,
    from: fromUserId,
    date
  };

  sender.transactions.push(senderTx);
  receiver.transactions.push(receiverTx);

  res.json({ message: 'Transfer successful' });
});

export default router;
