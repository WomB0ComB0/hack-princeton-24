export interface bankAccountStatus {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchBankAccountStatus<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  
  return await response.json() as T;
}

// gets all bank account statuses
export async function fetchAllBankAccountStatus(): Promise<bankAccountStatus[]> {
  return await fetchBankAccountStatus<bankAccountStatus[]>('/');
}

// gets a bank account status by id
export async function fetchBankAccountStatusById(id: number): Promise<bankAccountStatus> {
  return await fetchBankAccountStatus<bankAccountStatus>(`/${id}`);
}

// gets a bank account status by name
export async function fetchBankAccountStatusByName(name: string): Promise<bankAccountStatus> {
  return await fetchBankAccountStatus<bankAccountStatus>(`/${name}`);
}

// create a bank account status
export async function createBankAccountStatus(newBankAccountStatus: Partial<bankAccountStatus>): Promise<bankAccountStatus> {
  return await fetchBankAccountStatus<bankAccountStatus>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newBankAccountStatus),
  });
}

// change a bank account status
export async function updateBankAccountStatus(id: number, bankAccountStatus: Partial<bankAccountStatus>): Promise<bankAccountStatus> {
  return await fetchBankAccountStatus<bankAccountStatus>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(bankAccountStatus),
  });
}

// delete bank account status
export async function deleteBankAccountStatus(id: number): Promise<bankAccountStatus> {
  return await fetchBankAccountStatus(`/${id}`, {
    method: 'DELETE',
  });
}
