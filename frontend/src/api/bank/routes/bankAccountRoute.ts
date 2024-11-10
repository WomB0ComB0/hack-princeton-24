export interface bankAccount {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for bank accounts
async function fetchBankAccountData<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
}

//
// FUNCTIONS THAT RETURN MULTIPLE BANK ACCOUNTS
//

// Fetches all bank accounts
export async function fetchAllBankAccounts(): Promise<bankAccount[]> {
  const query = `
    query {
      bankAccounts {
        id
        name
      }
    }
  `;
  return await fetchBankAccountData<{ bankAccounts: bankAccount[] }>(query).then(
    (response) => response.bankAccounts,
  );
}

//
// FUNCTIONS THAT RETURN A SINGLE BANK ACCOUNT
//

// Fetches a bank account by ID
export async function fetchBankAccountById(bankId: number): Promise<bankAccount> {
  const query = `
    query GetbankAccountById($id: Int!) {
      bankAccount(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchBankAccountData<{ bankAccount: bankAccount }>(query, { id: bankId }).then(
    (response) => response.bankAccount,
  );
}
