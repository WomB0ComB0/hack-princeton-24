export interface transactionStatus {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for transaction statuses
async function fetchTransactionStatusData<T>(
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
// FUNCTIONS THAT RETURN MULTIPLE TRANSACTION STATUSES
//

// Fetches all transaction statuses
export async function fetchAllTransactionStatus(): Promise<transactionStatus[]> {
  const query = `
    query {
      transactionStatuses {
        id
        name
      }
    }
  `;
  return await fetchTransactionStatusData<{ transactionStatuses: transactionStatus[] }>(query).then(
    (response) => response.transactionStatuses,
  );
}

// Fetches transaction statuses by name (multiple results possible)
export async function fetchTransactionStatusesByName(name: string): Promise<transactionStatus[]> {
  const query = `
    query GetTransactionStatusesByName($name: String!) {
      transactionStatuses(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchTransactionStatusData<{ transactionStatuses: transactionStatus[] }>(query, {
    name,
  }).then((response) => response.transactionStatuses);
}

//
// FUNCTIONS THAT RETURN A SINGLE TRANSACTION STATUS
//

// Fetches a transaction status by ID
export async function fetchTransactionStatusById(id: number): Promise<transactionStatus> {
  const query = `
    query GetTransactionStatusById($id: Int!) {
      transactionStatus(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchTransactionStatusData<{ transactionStatus: transactionStatus }>(query, {
    id,
  }).then((response) => response.transactionStatus);
}
