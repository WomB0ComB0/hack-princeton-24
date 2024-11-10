import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { fetchAllAccountBalances, fetchTransactionsById } from '@/api';
import { transaction } from '@/api';
import { accountBalance } from '@/api';
import { useUserContext } from '../user_context';

export const Route = createFileRoute('/dashboard/planner')({
  component: Planner,
})

function Planner() {
  type AccountBalance = accountBalance;
  type Transaction = transaction;

  const { userId, setUserInfo } = useUserContext();

  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Fetch account balances
        const balances = await fetchAllAccountBalances();
        setAccountBalances(balances);

        // Fetch transactions
        const transactionsData = await fetchTransactionsById(userId);
        setTransactions(transactionsData);

        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Error fetching data');
        } else {
          setError('Error fetching data');
        }
        setLoading(false);
      }
    }

    loadData();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Planner</h1>
      
      <h2>Account Balances</h2>
      <ul>
        {accountBalances.map(balance => (
          <li key={balance.id}>{balance.amount} - {balance.currency_id}</li>
        ))}
      </ul>

      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.transaction_type_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

