interface transactionStatus {
  id: number;
  name: string;
}

// generic function that handles all CRUD operations
async function fetchTransactionStatus<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  
  return await response.json() as T;
}

// gets all transaction statuses
async function fetchAllTransactionStatus(): Promise<transactionStatus[]> {
  return await fetchTransactionStatus<transactionStatus[]>('/');
}

// gets a transactionStatus by id
async function fetchTransactionStatusById(id: number): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${id}`);
}

// gets a transactionStatus by name
async function fetchTransactionStatusByName(name: string): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${name}`);
}

// create a transactionStatus
async function createTransactionStatus(newTransactionStatus: Partial<transactionStatus>): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newTransactionStatus),
  });
}

// change a transactionStatus
async function updateTransactionStatus(id: number, transactionStatus: Partial<transactionStatus>): Promise<transactionStatus> {
  return await fetchTransactionStatus<transactionStatus>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(transactionStatus),
  });
}

// delete a transactionStatus
async function deleteTransactionStatus(id: number): Promise<transactionStatus> {
  return await fetchTransactionStatus(`/${id}`, {
    method: 'DELETE',
  });
}
