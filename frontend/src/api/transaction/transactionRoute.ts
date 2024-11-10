interface transaction {
  id: number;
  user_id: string;
  transaction_type_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

//
// GENERIC
//

// generic function that handles all CRUD operations
async function fetchTransaction<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  
  return await response.json() as T;
}

//
// RETURNS
// GROUP
// OF 
// TRANSACTIONS (GET)
//


// gets all transaction statuses
async function fetchAllTransactions(): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>('/');
}

// gets a transaction by id
async function fetchTransactionsById(id: number): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${id}`);
}

// gets a transaction by user id
async function fetchTransactionsByUserId(user_id: string): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${user_id}`);
}

// gets a transaction by transaction type id
async function fetchTransactionsByTransactionTypeId(transaction_type_id: number): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${transaction_type_id}`);
}

// gets transactions by date time
async function fetchTransactionsByDate(date_time: string): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${date_time}`);
}

// gets transactions by id then type then date
async function fetchTransactionsByIdThenTypeThenDate(id: number, transaction_type_id: number, date_time: string): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${id}/${transaction_type_id}/${date_time}`);
}

// gets transactions by id then date then type
async function fetchTransactionsByIdThenDateThenType(id: number, date_time: string, transaction_type_id: number): Promise<transaction[]> {
  return await fetchTransaction<transaction[]>(`/${id}/${transaction_type_id}/${date_time}`);
}

//
// RETURNS
// A
// TRANSACTION (GET)
//

// gets a transaction by id
async function fetchTransactionById(id: number): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${id}`);
}

// gets a transaction by user id
async function fetchTransactionByUserId(user_id: string): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${user_id}`);
}

// gets a transaction by transaction type id
async function fetchTransactionByTransactionTypeId(transaction_type_id: number): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${transaction_type_id}`);
}

// gets transactions by date time
async function fetchTransactionByDate(date_time: string): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${date_time}`);
}

// gets transactions by id then type then date
async function fetchTransactionByIdThenTypeThenDate(id: number, transaction_type_id: number, date_time: string): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${id}/${transaction_type_id}/${date_time}`);
}

// gets transactions by id then date then type
async function fetchTransactionByIdThenDateThenType(id: number, date_time: string, transaction_type_id: number): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${id}/${transaction_type_id}/${date_time}`);
}

//
// RETURNS
// ONE 
// TRANSACTION (NOT GET)
//

// change a transaction
async function updateTransaction(id: number, transaction: Partial<transaction>): Promise<transaction> {
  return await fetchTransaction<transaction>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(transaction),
  });
}

// delete a transaction
async function deleteTransaction(id: number): Promise<transaction> {
  return await fetchTransaction(`/${id}`, {
    method: 'DELETE',
  });
}

// create a transaction
async function createTransaction(newTransaction: Partial<transaction>): Promise<transaction> {
  return await fetchTransaction<transaction>('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newTransaction),
  });
}