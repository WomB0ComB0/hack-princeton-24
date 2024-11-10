export interface currency {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchCurrency<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  
  return await response.json() as T;
}

//
// GETS
// MULTIPLE
// TRANSACTIONS 
//

// gets all currencies
export async function fetchAllCurrencies(): Promise<currency[]> {
  return await fetchCurrency<currency[]>('/');
}

// gets a currency by id
export async function fetchCurrenciesById(id: number): Promise<currency[]> {
  return await fetchCurrency<currency[]>(`/${id}`);
}

// gets a currency by name
export async function fetchCurrenciesByName(name: string): Promise<currency[]> {
  return await fetchCurrency<currency[]>(`/${name}`);
}

//
// GETS
// ONE
// TRANSACTION (GET)
//

// gets a currency by id
export async function fetchCurrencyById(id: number): Promise<currency> {
  return await fetchCurrency<currency>(`/${id}`);
}

// gets a currency by name
export async function fetchCurrencyByName(name: string): Promise<currency> {
  return await fetchCurrency<currency>(`/${name}`);
}


//
// GETS
// ONE
// TRANSACTION (NON_GET)
//

// create a currency
export async function createCurrency(newCurrency: Partial<currency>): Promise<currency> {
  return await fetchCurrency<currency>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newCurrency),
  });
}

// change a currency
export async function updateCurrency(id: number, currency: Partial<currency>): Promise<currency> {
  return await fetchCurrency<currency>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(currency),
  });
}

// delete a currency
export async function deleteCurrency(id: number): Promise<currency> {
  return await fetchCurrency(`/${id}`, {
    method: 'DELETE',
  });
}