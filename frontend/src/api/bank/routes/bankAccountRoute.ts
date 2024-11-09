interface bankAccount {
  id: number;
  name: string;
}


// generic function that handles all CRUD operations
async function fetchBankAccount<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  
  return await response.json() as T;
}

// get all bank accounts 
async function fetchAllBankAccounts(): Promise<bankAccount[]> {
  return await fetchBankAccount<bankAccount[]>('/banks');
}

// get a bank account 
async function fetchBankAccountById(bankId: Number): Promise<bankAccount> {
  return await fetchBankAccount<bankAccount>(`/banks/${bankId}`);
}

// create a bank account
async function createBankAccount(bankId: Number, newBank: Partial<bankAccount>): Promise<bankAccount> {
  return await fetchBankAccount<bankAccount>(`/banks/${bankId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBank),
  })
}

// delete a bank account
async function deleteBankAccount(bankId: Number): Promise<bankAccount> {
  return fetchBankAccount(`/banks/${bankId}`);
}