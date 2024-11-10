export interface bank {
  id: number;
  name: string;
  routing_number: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchBank<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

// get all banks
export async function fetchAllBanks(): Promise<bank[]> {
  return await fetchBank<bank[]>('/');
}

// get banks by id 
export async function fetchBanksById(id: number): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${id}`);
}

// get banks by name
export async function fetchBanksByName(name: string): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${name}`);
}

// get bank by routing number 
export async function fetchBanksByRoutingNumber(routing_number: number): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${routing_number}`);
}

//
// GETS
// ONE
// TRANSACTION (GET)
//

// get bank by id 
export async function fetchBankById(id: number): Promise<bank> {
  return await fetchBank<bank>(`/${id}`);
}

// get bank by name
export async function fetchBankByName(name: string): Promise<bank> {
  return await fetchBank<bank>(`/${name}`);
}

// get bank by routing number 
export async function fetchBankByRoutingNumber(routing_number: number): Promise<bank> {
  return await fetchBank<bank>(`/${routing_number}`);
}

//
// GETS
// ONE
// TRANSACTION (NON-GET)
//

// create a new bank (manual entries)
export async function createBank(newBank: Partial<bank>): Promise<bank> {
  return await fetchBank<bank>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newBank),
  });
}

// update a bank (i.e. bank details incorrect) 
export async function updateBank(id: number, bank: Partial<bank>): Promise<bank> {
  return await fetchBank<bank>(`${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bank),
  });
}


// delete a bank (manual entries) 
export async function deleteBank(id: number): Promise<bank> {
  return await fetchBank(`/${id}`, {
    method: 'DELETE',
  });
}

