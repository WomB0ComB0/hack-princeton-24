interface transactionStatus {
  id: number;
  name: string;
}

async function fetchTransactionStatuses(): Promise<transactionStatus[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Failed to fetch transaction statuses ');
  }

  const transactionStatuses = (await response.json()) as transactionStatus[];
  return transactionStatuses;
}
