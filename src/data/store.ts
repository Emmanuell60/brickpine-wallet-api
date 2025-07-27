export interface User {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'fund' | 'transfer';
  amount: number;
  to?: string;
  from?: string;
  date: string;
}

export const users: Record<string, User> = {};
