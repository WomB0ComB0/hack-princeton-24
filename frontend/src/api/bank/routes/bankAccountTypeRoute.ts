export interface bankAccountType {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for bank account types
async function fetchBankAccountTypeData<T>(
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
// FUNCTIONS THAT RETURN MULTIPLE BANK ACCOUNT TYPES
//

// Fetches all bank account types
export async function fetchAllBankAccountTypes(): Promise<bankAccountType[]> {
  const query = `
    query {
      bankAccountTypes {
        id
        name
      }
    }
  `;
  return await fetchBankAccountTypeData<{ bankAccountTypes: bankAccountType[] }>(query).then(
    (response) => response.bankAccountTypes,
  );
}

//
// FUNCTIONS THAT RETURN A SINGLE BANK ACCOUNT TYPE
//

// Fetches a bank account type by ID
export async function fetchBankAccountTypeById(id: number): Promise<bankAccountType> {
  const query = `
    query GetBankAccountTypeById($id: Int!) {
      bankAccountType(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchBankAccountTypeData<{ bankAccountType: bankAccountType }>(query, { id }).then(
    (response) => response.bankAccountType,
  );
}

// Fetches a bank account type by name
export async function fetchBankAccountTypeByName(name: string): Promise<bankAccountType> {
  const query = `
    query GetBankAccountTypeByName($name: String!) {
      bankAccountType(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchBankAccountTypeData<{ bankAccountType: bankAccountType }>(query, { name }).then(
    (response) => response.bankAccountType,
  );
}
