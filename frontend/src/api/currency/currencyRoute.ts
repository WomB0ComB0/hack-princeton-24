export interface currency {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for currencies
async function fetchCurrencyData<T>(
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
// FUNCTIONS THAT RETURN MULTIPLE CURRENCIES
//

// Fetches all currencies
export async function fetchAllCurrencies(): Promise<currency[]> {
  const query = `
    query {
      currencies {
        id
        name
      }
    }
  `;
  return await fetchCurrencyData<{ currencies: currency[] }>(query).then(
    (response) => response.currencies,
  );
}

// Fetches currencies by name (multiple results possible)
export async function fetchCurrenciesByName(name: string): Promise<currency[]> {
  const query = `
    query GetCurrenciesByName($name: String!) {
      currencies(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchCurrencyData<{ currencies: currency[] }>(query, { name }).then(
    (response) => response.currencies,
  );
}

//
// FUNCTIONS THAT RETURN A SINGLE CURRENCY
//

// Fetches a currency by ID
export async function fetchCurrencyById(id: number): Promise<currency> {
  const query = `
    query GetCurrencyById($id: Int!) {
      currency(id: $id) {
        id
        name
      }
    }
  `;
  return await fetchCurrencyData<{ currency: currency }>(query, { id }).then(
    (response) => response.currency,
  );
}

// Fetches a currency by name (assuming a unique name)
export async function fetchCurrencyByName(name: string): Promise<currency> {
  const query = `
    query GetCurrencyByName($name: String!) {
      currency(name: $name) {
        id
        name
      }
    }
  `;
  return await fetchCurrencyData<{ currency: currency }>(query, { name }).then(
    (response) => response.currency,
  );
}
