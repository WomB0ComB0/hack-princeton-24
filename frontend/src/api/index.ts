// export * from './account';
// export * from './auth';
// export * from './bank';
// export * from './currency';
// export * from './transaction';
import { gql } from 'graphql-request';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
}

interface Bank {
  id: string;
  name: string;
}

interface BankAccountType {
  id: number;
  name: string;
}

interface BankAccountStatus {
  id: number;
  name: string;
}

interface Account {
  id: string;
  user: User;
  bank: Bank;
  bankAccountType: BankAccountType;
  bankAccountStatus: BankAccountStatus;
}

interface TransactionStatus {
  id: number;
  name: string;
}

interface TransactionType {
  id: number;
  name: string;
}

interface TransactionCategory {
  id: number;
  name: string;
}

interface Transaction {
  id: string;
  user: User;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  transactionCategory: TransactionCategory;
  amount: number;
  dateTime: string;
}

interface SecurityType {
  id: number;
  name: string;
}

interface SecurityAsset {
  id: number;
  bankAccount: Account;
  symbol: string;
  quantity: number;
  securityType: SecurityType;
}

interface Currency {
  id: number;
  symbol: string;
  description: string;
}

interface Balance {
  id: string;
  bankAccount: Account;
  currency: Currency;
  amount: number;
  dateTime: string;
}

interface Message {
  id: number;
  user: User;
  content: string;
}

// Queries
export const ACCOUNTS_QUERY = gql`
  query {
    accounts {
      id
      user {
        id
        firstName
        lastName
        birthdate
        email
        phoneNumber
      }
      bank {
        id
        name
      }
      bankAccountType {
        id
        name
      }
      bankAccountStatus {
        id
        name
      }
    }
  }
`;

export const BALANCES_QUERY = gql`
  query {
    balances {
      id
      bankAccount {
        id
        bank {
          name
        }
      }
      currency {
        id
        symbol
        description
      }
      amount
      dateTime
    }
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query {
    transactions {
      id
      user {
        id
        firstName
        lastName
      }
      transactionStatus {
        id
        name
      }
      transactionType {
        id
        name
      }
      transactionCategory {
        id
        name
      }
      amount
      dateTime
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query {
    messages {
      id
      user {
        id
        firstName
        lastName
        email
      }
      content
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      firstName
      lastName
      birthdate
      email
      phoneNumber
    }
  }
`;

// Response Types
export interface AccountsResponse {
  accounts: Account[];
}

export interface BalancesResponse {
  balances: Balance[];
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface MessagesResponse {
  messages: Message[];
}

export interface UsersResponse {
  users: User[];
}