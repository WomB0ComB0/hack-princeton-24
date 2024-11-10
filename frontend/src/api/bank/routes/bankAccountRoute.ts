export interface bankAccount {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchBankAccount<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
}

// get all bank accounts
export async function fetchAllBankAccounts(): Promise<bankAccount[]> {
  return await fetchBankAccount<bankAccount[]>('/');
}

// get a bank account
export async function fetchBankAccountById(bankId: number): Promise<bankAccount> {
  return await fetchBankAccount<bankAccount>(`/${bankId}`);
}

// create a bank account
export async function createBankAccount(newBankAccount: Partial<bankAccount>): Promise<bankAccount> {
  return await fetchBankAccount<bankAccount>('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBankAccount),
  });
}

// delete a bank account
export async function deleteBankAccount(bankId: number): Promise<bankAccount> {
  return fetchBankAccount(`/${bankId}`);
}
