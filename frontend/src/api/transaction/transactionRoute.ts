interface transaction {
  id: number;
  user_id: string;
  transaction_type_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

async function fetchTransactions(): Promise<transaction[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching transactions');
  }

  const transaction = (await response.json()) as transaction[];
  return transaction;
}
