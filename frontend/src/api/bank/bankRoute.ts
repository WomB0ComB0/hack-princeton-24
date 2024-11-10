interface bank {
  id: number;
  name: string;
  routing_number: string;
}

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
async function fetchAllBanks(): Promise<bank[]> {
  return await fetchBank<bank[]>('/');
}

// get banks by id 
async function fetchBanksById(id: number): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${id}`);
}

// get banks by name
async function fetchBanksByName(name: string): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${name}`);
}

// get bank by routing number 
async function fetchBanksByRoutingNumber(routing_number: number): Promise<bank[]> {
  return await fetchBank<bank[]>(`/${routing_number}`);
}

//
// GETS
// ONE
// TRANSACTION (GET)
//

// get bank by id 
async function fetchBankById(id: number): Promise<bank> {
  return await fetchBank<bank>(`/${id}`);
}

// get bank by name
async function fetchBankByName(name: string): Promise<bank> {
  return await fetchBank<bank>(`/${name}`);
}

// get bank by routing number 
async function fetchBankByRoutingNumber(routing_number: number): Promise<bank> {
  return await fetchBank<bank>(`/${routing_number}`);
}

//
// GETS
// ONE
// TRANSACTION (NON-GET)
//

// create a new bank (manual entries)
async function createBank(newBank: Partial<bank>): Promise<bank> {
  return await fetchBank<bank>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newBank),
  });
}

// update a bank (i.e. bank details incorrect) 
async function updateBank(id: number, bank: Partial<bank>): Promise<bank> {
  return await fetchBank<bank>(`${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bank),
  });
}


// delete a bank (manual entries) 
async function deleteBank(id: number): Promise<bank> {
  return await fetchBank(`/${id}`, {
    method: 'DELETE',
  });
}

