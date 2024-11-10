import type { bank, bankAccount, bankAccountStatus, bankAccountType } from '@/api';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/dashboard/accounts')({
  component: accounts,
});

function accounts() {
  type Bank = bank;
  type BankAccount = bankAccount;
  type BankAccountStatus = bankAccountStatus;
  type BankAccountTypeRoute = bankAccountType;

  const [banks, setBanks] = useState<bank[]>([]);
  const [bankAccounts, setBankAccounts] = useState<bankAccount[]>([]);
  const [bankAccountStatuses, setBankAccountStatuses] = useState<bankAccountStatus[]>([]);
  const [bankAccountTypes, setBankAccountTypes] = useState<bankAccountType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      </div>
    </>
  );
}
