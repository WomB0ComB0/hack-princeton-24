interface accountBalance {
  id: number;
  bank_account_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

async function fetchAccountBalance(): Promise<accountBalance[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching account balances');
  }

  const accountBalance = (await response.json()) as accountBalance[];
  return accountBalance;
}
