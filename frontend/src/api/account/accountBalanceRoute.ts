export interface accountBalance {
  id: number;
  bank_account_id: number;
  currency_id: number;
  amount: number;
  date_time: string;
}

const BASE_URL = 'http://localhost:8080/graphql';

// Generic function to handle all GraphQL queries for account balances
async function fetchAccountBalanceData<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
}

//
// FUNCTIONS THAT RETURN MULTIPLE ACCOUNT BALANCES
//

// Fetches all account balances
export async function fetchAllAccountBalances(): Promise<accountBalance[]> {
  const query = `
    query {
      accountBalances {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalances: accountBalance[] }>(query).then(
    (response) => response.accountBalances,
  );
}

// Fetches account balances by ID (multiple results)
export async function fetchAccountBalancesById(id: number): Promise<accountBalance[]> {
  const query = `
    query GetAccountBalancesById($id: Int!) {
      accountBalancesById(id: $id) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalancesById: accountBalance[] }>(query, {
    id,
  }).then((response) => response.accountBalancesById);
}

// Fetches account balances by ID and date (multiple results)
export async function fetchAccountBalancesByIdAndDate(
  id: number,
  date_time: string,
): Promise<accountBalance[]> {
  const query = `
    query GetAccountBalancesByIdAndDate($id: Int!, $date_time: String!) {
      accountBalancesByIdAndDate(id: $id, date_time: $date_time) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalancesByIdAndDate: accountBalance[] }>(query, {
    id,
    date_time,
  }).then((response) => response.accountBalancesByIdAndDate);
}

// Fetches account balances by ID and amount (multiple results)
export async function fetchAccountBalancesByIdAndAmount(
  id: number,
  amount: number,
): Promise<accountBalance[]> {
  const query = `
    query GetAccountBalancesByIdAndAmount($id: Int!, $amount: Float!) {
      accountBalancesByIdAndAmount(id: $id, amount: $amount) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalancesByIdAndAmount: accountBalance[] }>(query, {
    id,
    amount,
  }).then((response) => response.accountBalancesByIdAndAmount);
}

//
// FUNCTIONS THAT RETURN A SINGLE ACCOUNT BALANCE
//

// Fetches a single account balance by ID
export async function fetchAccountBalanceById(id: number): Promise<accountBalance> {
  const query = `
    query GetAccountBalanceById($id: Int!) {
      accountBalance(id: $id) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalance: accountBalance }>(query, { id }).then(
    (response) => response.accountBalance,
  );
}

// Fetches a single account balance by ID and date
export async function fetchAccountBalanceByIdAndDate(
  id: number,
  date_time: string,
): Promise<accountBalance> {
  const query = `
    query GetAccountBalanceByIdAndDate($id: Int!, $date_time: String!) {
      accountBalanceByIdAndDate(id: $id, date_time: $date_time) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalanceByIdAndDate: accountBalance }>(query, {
    id,
    date_time,
  }).then((response) => response.accountBalanceByIdAndDate);
}

// Fetches a single account balance by ID and amount
export async function fetchAccountBalanceByIdAndAmount(
  id: number,
  amount: number,
): Promise<accountBalance> {
  const query = `
    query GetAccountBalanceByIdAndAmount($id: Int!, $amount: Float!) {
      accountBalanceByIdAndAmount(id: $id, amount: $amount) {
        id
        bank_account_id
        currency_id
        amount
        date_time
      }
    }
  `;
  return await fetchAccountBalanceData<{ accountBalanceByIdAndAmount: accountBalance }>(query, {
    id,
    amount,
  }).then((response) => response.accountBalanceByIdAndAmount);
}
