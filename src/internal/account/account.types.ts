import { TransactionType } from 'src/module/transaction/transaction.types';

export type ChangeBalanceParams = {
  userId: string;
  balance: string;
  transactionType: TransactionType;
};
