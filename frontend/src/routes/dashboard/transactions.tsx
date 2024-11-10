import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { transaction, transactionStatus, transactionType } from '@/api'

export const Route = createFileRoute('/dashboard/transactions')({
  component: transactions,
})

function transactions() {
  type Transaction = transaction;
  type TransactionStatus = transactionStatus;
  type TransactionType = transactionType;

  const [ transactions, setTransactions ] = useState<Transaction[]>([]);
  const [ transactionStatuses, setTransactionStatuses ] = useState<TransactionStatus[]>([]);
  const [ transactionTypes, setTransactionTypes ] = useState<TransactionType[]>([]);

  return 'Hello /dashboard/transactions!'
}
