export interface bank {
  id: number;
  name: string;
  routing_number: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for banks
async function fetchBankData<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
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
// FUNCTIONS THAT RETURN MULTIPLE BANKS
//

// Fetches all banks
export async function fetchAllBanks(): Promise<bank[]> {
  const query = `
    query {
      banks {
        id
        name
        routing_number
      }
    }
  `;
  return await fetchBankData<{ banks: bank[] }>(query).then((response) => response.banks);
}

// Fetches banks by name (multiple results possible)
export async function fetchBanksByName(name: string): Promise<bank[]> {
  const query = `
    query GetBanksByName($name: String!) {
      banks(name: $name) {
        id
        name
        routing_number
      }
    }
  `;
  return await fetchBankData<{ banks: bank[] }>(query, { name }).then((response) => response.banks);
}

//
// FUNCTIONS THAT RETURN A SINGLE BANK
//

// Fetches a bank by ID
export async function fetchBankById(id: number): Promise<bank> {
  const query = `
    query GetBankById($id: Int!) {
      bank(id: $id) {
        id
        name
        routing_number
      }
    }
  `;
  return await fetchBankData<{ bank: bank }>(query, { id }).then((response) => response.bank);
}

// Fetches a bank by name (assuming a unique name)
export async function fetchBankByName(name: string): Promise<bank> {
  const query = `
    query GetBankByName($name: String!) {
      bank(name: $name) {
        id
        name
        routing_number
      }
    }
  `;
  return await fetchBankData<{ bank: bank }>(query, { name }).then((response) => response.bank);
}

// Fetches a bank by routing number (assuming a unique routing number)
export async function fetchBankByRoutingNumber(routing_number: string): Promise<bank> {
  const query = `
    query GetBankByRoutingNumber($routing_number: String!) {
      bank(routing_number: $routing_number) {
        id
        name
        routing_number
      }
    }
  `;
  return await fetchBankData<{ bank: bank }>(query, { routing_number }).then(
    (response) => response.bank,
  );
}
