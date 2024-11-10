interface transactionStatus {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchTransactionStatus<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

// gets all transaction statuses
export async function fetchAllTransactionStatus(): Promise<transactionStatus[]> {
  return await fetchTransactionStatus<transactionStatus[]>('/');
}

// gets a transactionStatus by id
export async function fetchTransactionStatusesById(id: number): Promise<transactionStatus[]> {
  return await fetchTransactionStatus<transactionStatus[]>(`/${id}`);
}

// gets a transactionStatus by name
export async function fetchTransactionStatusesByName(name: string): Promise<transactionStatus[]> {
  return await fetchTransactionStatus<transactionStatus[]>(`/${name}`);
}

//
// GETS
// ONE
// TRANSACTION (GET)
//

// gets a transactionStatus by id
export async function fetchTransactionStatusById(id: number): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${id}`);
}

// gets a transactionStatus by name
export async function fetchTransactionStatusByName(name: string): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${name}`);
}


//
// GETS
// ONE
// TRANSACTION (NON-GET)
//

// create a transactionStatus
export async function createTransactionStatus(newTransactionStatus: Partial<transactionStatus>): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newTransactionStatus),
  });
}

// change a transactionStatus
export async function updateTransactionStatus(id: number, transactionStatus: Partial<transactionStatus>): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(transactionStatus),
  });
}

// delete a transactionStatus
export async function deleteTransactionStatus(id: number): Promise<transactionStatus> {
  return await fetchTransactionStatus(`/${id}`, {
    method: 'DELETE',
  });
}
