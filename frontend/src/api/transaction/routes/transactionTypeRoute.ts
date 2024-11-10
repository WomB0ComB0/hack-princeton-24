export interface transactionType {
  id: number;
  name: string;
}

const BASE_URL = 'https://backend-purple-dawn-8577.fly.dev/graphql';

// Generic function to handle all GraphQL queries for transaction types
async function fetchTransactionTypeData<T>(
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
// FUNCTIONS THAT RETURN MULTIPLE TRANSACTION TYPES
//

// Fetches all transaction types
export async function fetchAllTransactionTypes(): Promise<transactionType[]> {
  const query = `
    query {
      transactionTypes {
        id
        name
      }
    }
  `;
  return await fetchTransactionTypeData<{ transactionTypes: transactionType[] }>(query).then(
    (response) => response.transactionTypes,
  );
}

// Fetches transaction types by name (multiple results possible)
export async function fetchTransactionTypesByName(name: string): Promise<transactionType[]> {
  const query = `
    query GetTransactionTypesByName($name: String!) {
      transactionTypes(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchTransactionTypeData<{ transactionTypes: transactionType[] }>(query, {
    name,
  }).then((response) => response.transactionTypes);
}

//
// FUNCTIONS THAT RETURN A SINGLE TRANSACTION TYPE
//

// Fetches a transaction type by ID
export async function fetchTransactionTypeById(id: number): Promise<transactionType> {
  const query = `
    query GetTransactionTypeById($id: Int!) {
      transactionType(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchTransactionTypeData<{ transactionType: transactionType }>(query, { id }).then(
    (response) => response.transactionType,
  );
}

// Fetches a transaction type by name (assuming a unique name)
export async function fetchTransactionTypeByName(name: string): Promise<transactionType> {
  const query = `
    query GetTransactionTypeByName($name: String!) {
      transactionType(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchTransactionTypeData<{ transactionType: transactionType }>(query, { name }).then(
    (response) => response.transactionType,
  );
}
