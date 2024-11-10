export interface accountBalance {
  id: number;
  bank_account_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

const BASE_URL = 'http://localhost:8080/api';

// generic function that handles all CRUD operations
async function fetchAccountBalance<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
}

//
// RETURNS
// MULTIPLE
// BALANCES
//

// gets all account balances
export async function fetchAllAccountBalances(): Promise<accountBalance[]> {
  return await fetchAccountBalance<accountBalance[]>('/');
}

// get account balances by id
export async function fetchAccountBalancesById(id: number): Promise<accountBalance[]> {
  return await fetchAccountBalance<accountBalance[]>(`/${id}`);
}

// get account balances by id and date
export async function fetchAccountBalancesByIdAndDate(id: number, date_time: string): Promise<accountBalance[]> {
  return await fetchAccountBalance<accountBalance[]>(`/${id}/${date_time}`);
}

// get account balances by id and amount
export async function fetchAccountBalancesByIdAndAmount(id: number, amount: number): Promise<accountBalance[]> {
  return await fetchAccountBalance<accountBalance[]>(`/${id}/${amount}`);
}

//
// RETURNS
// ONE
// BALANCE (GET)
//

// get a account balance by id
export async function fetchAccountBalanceById(id: number): Promise<accountBalance> {
  return await fetchAccountBalance<accountBalance>(`/${id}`);
}

// get a account balance by id and date
export async function fetchAccountBalanceByIdAndDate(id: number, date_time: string): Promise<accountBalance> {
  return await fetchAccountBalance<accountBalance>(`/${id}/${date_time}`);
}

// get a account balance by id and amount
export async function fetchAccountBalanceByIdAndAmount(id: number, amount: number): Promise<accountBalance> {
  return await fetchAccountBalance<accountBalance>(`/${id}/${amount}`);
}


//
// RETURNS
// ONE
// BALANCE (NON-GET)
//

// create account balance (for manual entries)
export async function createAccountBalance(newAccountBalance: Partial<accountBalance>): Promise<accountBalance> {
  return await fetchAccountBalance<accountBalance>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAccountBalance),
  });
}

// delete account balance (for manual entries)
export async function deleteAccountBalance(id: number): Promise<accountBalance> {
  return await fetchAccountBalance(`/${id}`, {
    method: 'DELETE',
  });
}

// update account balance (for manual entries)
export async function updateAccountBalance(id: number, accountBalance: Partial<accountBalance>): Promise<accountBalance> {
  return await fetchAccountBalance<accountBalance>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountBalance),
  });
}
