import type { bank, bankAccount, bankAccountStatus, bankAccountType } from '@/api';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { gql } from 'graphql-request';

// GraphQL Queries
export const GET_BANK_ACCOUNTS = gql`
  query GetBankAccounts {
    accounts {
      id
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

export const GET_BANKS = gql`
  query GetBanks {
    banks {
      id
      name
    }
  }
`;

export const GET_BANK_ACCOUNT_STATUSES = gql`
  query GetBankAccountStatuses {
    bankAccountStatuses {
      id
      name
    }
  }
`;

export const GET_BANK_ACCOUNT_TYPES = gql`
  query GetBankAccountTypes {
    bankAccountTypes {
      id
      name
    }
  }
`;

// Response Types
interface BankAccountsResponse {
  accounts: bankAccount[];
}

interface BanksResponse {
  banks: bank[];
}

interface BankAccountStatusesResponse {
  bankAccountStatuses: bankAccountStatus[];
}

interface BankAccountTypesResponse {
  bankAccountTypes: bankAccountType[];
}

export const Route = createFileRoute('/dashboard/accounts')({
  component: Accounts,
});

function Accounts() {
  // Types from imports
  type Bank = bank;
  type BankAccount = bankAccount;
  type BankAccountStatus = bankAccountStatus;
  type BankAccountType = bankAccountType;

  // State
  const [banks, setBanks] = useState<Bank[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [bankAccountStatuses, setBankAccountStatuses] = useState<BankAccountStatus[]>([]);
  const [bankAccountTypes, setBankAccountTypes] = useState<BankAccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // You can use your API client here to fetch the data
        // Example:
        // const accountsResponse = await request<BankAccountsResponse>(BASE_URL, GET_BANK_ACCOUNTS);
        // setBankAccounts(accountsResponse.accounts);
        
        // const banksResponse = await request<BanksResponse>(BASE_URL, GET_BANKS);
        // setBanks(banksResponse.banks);
        
        // const statusesResponse = await request<BankAccountStatusesResponse>(BASE_URL, GET_BANK_ACCOUNT_STATUSES);
        // setBankAccountStatuses(statusesResponse.bankAccountStatuses);
        
        // const typesResponse = await request<BankAccountTypesResponse>(BASE_URL, GET_BANK_ACCOUNT_TYPES);
        // setBankAccountTypes(typesResponse.bankAccountTypes);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Accounts</h2>
        {/* Display your data here */}
        <div className="grid gap-6">
          {bankAccounts.map((account) => (
            <div key={account.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">
                {banks.find(b => b.id === account.bank.id)?.name}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Type: {bankAccountTypes.find(t => t.id === account.bankAccountType.id)?.name}</p>
                <p>Status: {bankAccountStatuses.find(s => s.id === account.bankAccountStatus.id)?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}