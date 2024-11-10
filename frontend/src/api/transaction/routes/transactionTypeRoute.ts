interface transactionType {
  id: number;
  name: string;
}

// generic function that handles all CRUD operations
async function fetchTransactionType<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
// TRANSACTIONS (GET)
//

// gets all transaction types
async function fetchAllTransactionTypes(): Promise<transactionType[]> {
  return await fetchTransactionType<transactionType[]>('/');
}

// gets a transactionType by id
async function fetchTransactionTypesById(id: number): Promise<transactionType[]> {
  return await fetchTransactionType<transactionType[]>(`/${id}`);
}

// gets a transactionType by name
async function fetchTransactionsTypeByName(name: string): Promise<transactionType[]> {
  return await fetchTransactionType<transactionType[]>(`/${name}`);
}

//
// GETS 
// ONE
// TRANSACTION (GET)
//

// gets a transactionType by id
async function fetchTransactionTypeById(id: number): Promise<transactionType[]> {
  return await fetchTransactionType<transactionType[]>(`/${id}`);
}

// gets a transactionType by name
async function fetchTransactionTypeByName(name: string): Promise<transactionType[]> {
  return await fetchTransactionType<transactionType[]>(`/${name}`);
}

//
// GETS 
// ONLY
// ONE TRANSACTION (NON-GET)
//

// create a transactionType
async function createTransactionType(newTransactionType: Partial<transactionType>): Promise<transactionType> {
  return await fetchTransactionType<transactionType>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newTransactionType),
  });
}

// change a transactionType
async function updateTransactionType(id: number, transactionType: Partial<transactionType>): Promise<transactionType> {
  return await fetchTransactionType<transactionType>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(transactionType),
  });
}

// delete a transactionType
async function deleteTransactionType(id: number): Promise<transactionType> {
  return await fetchTransactionType(`/${id}`, {
    method: 'DELETE',
  });
}
