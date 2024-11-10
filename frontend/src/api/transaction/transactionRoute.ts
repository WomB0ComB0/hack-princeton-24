export interface transaction {
  id: number;
  user_id: string;
  transaction_type_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for transactions
async function fetchTransactionData<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return await response.json() as T;
}

//
// FUNCTIONS THAT RETURN MULTIPLE TRANSACTIONS
//

// Fetches all transactions
export async function fetchAllTransactions(): Promise<transaction[]> {
  const query = `
    query {
      transactions {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transactions: transaction[] }>(query)
    .then(response => response.transactions);
}

// Fetches transactions by user ID
export async function fetchTransactionsByUserId(user_id: string): Promise<transaction[]> {
  const query = `
    query GetTransactionsByUserId($user_id: String!) {
      transactions(user_id: $user_id) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transactions: transaction[] }>(query, { user_id })
    .then(response => response.transactions);
}

// Fetches transactions by transaction type ID
export async function fetchTransactionsByTransactionTypeId(transaction_type_id: number): Promise<transaction[]> {
  const query = `
    query GetTransactionsByTransactionTypeId($transaction_type_id: Int!) {
      transactions(transaction_type_id: $transaction_type_id) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transactions: transaction[] }>(query, { transaction_type_id })
    .then(response => response.transactions);
}

// Fetches transactions by date
export async function fetchTransactionsByDate(date_time: string): Promise<transaction[]> {
  const query = `
    query GetTransactionsByDate($date_time: String!) {
      transactions(date_time: $date_time) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transactions: transaction[] }>(query, { date_time })
    .then(response => response.transactions);
}

//
// FUNCTIONS THAT RETURN A SINGLE TRANSACTION
//

// Fetches a transaction by ID
export async function fetchTransactionById(id: number): Promise<transaction> {
  const query = `
    query GetTransactionById($id: Int!) {
      transaction(id: $id) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transaction: transaction }>(query, { id })
    .then(response => response.transaction);
}

// Fetches a transaction by user ID (assuming unique for example)
export async function fetchTransactionByUserId(user_id: string): Promise<transaction> {
  const query = `
    query GetTransactionByUserId($user_id: String!) {
      transaction(user_id: $user_id) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transaction: transaction }>(query, { user_id })
    .then(response => response.transaction);
}

// Fetches a transaction by transaction type ID (assuming unique for example)
export async function fetchTransactionByTransactionTypeId(transaction_type_id: number): Promise<transaction> {
  const query = `
    query GetTransactionByTransactionTypeId($transaction_type_id: Int!) {
      transaction(transaction_type_id: $transaction_type_id) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transaction: transaction }>(query, { transaction_type_id })
    .then(response => response.transaction);
}

// Fetches a transaction by date (assuming unique for example)
export async function fetchTransactionByDate(date_time: string): Promise<transaction> {
  const query = `
    query GetTransactionByDate($date_time: String!) {
      transaction(date_time: $date_time) {
        id
        user_id
        transaction_type_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchTransactionData<{ transaction: transaction }>(query, { date_time })
    .then(response => response.transaction);
}
