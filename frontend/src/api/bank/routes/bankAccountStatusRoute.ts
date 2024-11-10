export interface bankAccountStatus {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for bank account statuses
async function fetchBankAccountStatusData<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return await response.json() as T;
}

//
// FUNCTIONS THAT RETURN MULTIPLE BANK ACCOUNT STATUSES
//

// Fetches all bank account statuses
export async function fetchAllBankAccountStatus(): Promise<bankAccountStatus[]> {
  const query = `
    query {
      bankAccountStatuses {
        id
        name
      }
    }
  `;
  return await fetchBankAccountStatusData<{ bankAccountStatuses: bankAccountStatus[] }>(query)
    .then(response => response.bankAccountStatuses);
}

//
// FUNCTIONS THAT RETURN A SINGLE BANK ACCOUNT STATUS
//

// Fetches a bank account status by ID
export async function fetchBankAccountStatusById(id: number): Promise<bankAccountStatus> {
  const query = `
    query GetBankAccountStatusById($id: Int!) {
      bankAccountStatus(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchBankAccountStatusData<{ bankAccountStatus: bankAccountStatus }>(query, { id })
    .then(response => response.bankAccountStatus);
}

// Fetches a bank account status by name
export async function fetchBankAccountStatusByName(name: string): Promise<bankAccountStatus> {
  const query = `
    query GetBankAccountStatusByName($name: String!) {
      bankAccountStatus(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchBankAccountStatusData<{ bankAccountStatus: bankAccountStatus }>(query, { name })
    .then(response => response.bankAccountStatus);
}



