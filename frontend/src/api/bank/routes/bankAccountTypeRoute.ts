export interface bankAccountType {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchBankAccountType<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.type} - ${errorText}`);
  }
  
  return await response.json() as T;
}

// gets all bank account types
export async function fetchAllBankAccountTypes(): Promise<bankAccountType[]> {
  return await fetchBankAccountType<bankAccountType[]>('/');
}

// gets a bank account type by id
export async function fetchBankAccountTypeById(id: number): Promise<bankAccountType> {
  return await fetchBankAccountType<bankAccountType>(`/${id}`);
}

// gets a bank account type by name
export async function fetchBankAccountTypeByName(name: string): Promise<bankAccountType> {
  return await fetchBankAccountType<bankAccountType>(`/${name}`);
}

// create a bank account type
export async function createBankAccountType(newBankAccountType: Partial<bankAccountType>): Promise<bankAccountType> {
  return await fetchBankAccountType<bankAccountType>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newBankAccountType),
  });
}

// change a bank account type
export async function updateBankAccountType(id: number, bankAccountType: Partial<bankAccountType>): Promise<bankAccountType> {
  return await fetchBankAccountType<bankAccountType>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(bankAccountType),
  });
}

// delete bank account type
export async function deleteBankAccountType(id: number): Promise<bankAccountType> {
  return await fetchBankAccountType(`/${id}`, {
    method: 'DELETE',
  });
}
