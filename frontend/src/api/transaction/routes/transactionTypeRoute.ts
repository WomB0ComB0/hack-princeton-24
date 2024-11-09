interface transactionType {
  id: number;
  name: string;
}

async function fetchTransactionTypes(): Promise<transactionType[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Failed to fetch transaction types');
  }

  const transactionType = (await response.json()) as transactionType[];
  return transactionType;
}
