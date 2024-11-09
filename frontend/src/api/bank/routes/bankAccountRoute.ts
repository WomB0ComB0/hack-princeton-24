interface bankAccount {
  id: number;
  name: string;
}

async function fetchBankAccounts(): Promise<bankAccount[]> {
  const response = await fetch('http://localhost:8080/graphql');

  if (!response.ok) {
    throw new Error('Error fetching bank accounts');
  }

  const bankAccount = (await response.json()) as bankAccount[];
  return bankAccount;
}
