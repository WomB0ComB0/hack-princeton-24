import React, { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { gql, request } from 'graphql-request';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

import { 
  TRANSACTIONS_QUERY,
  type Transaction, 
  type TransactionStatus, 
  type TransactionType,
  type TransactionsResponse
} from '@/api';

const GRAPHQL_ENDPOINT = 'https://backend-purple-dawn-8577.fly.dev/graphql';

const TRANSACTION_STATUSES_QUERY = gql`
  query GetTransactionStatuses {
    transactionStatuses {
      id
      name
    }
  }
`;

const TRANSACTION_TYPES_QUERY = gql`
  query GetTransactionTypes {
    transactionTypes {
      id
      name
    }
  }
`;

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-1/3" />
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-60 w-full" />
      </CardContent>
    </Card>
  </div>
);

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export const Route = createFileRoute('/dashboard/transactions')({
  component: TransactionsDashboard,
});

function TransactionsDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionStatuses, setTransactionStatuses] = useState<TransactionStatus[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use the imported TRANSACTIONS_QUERY
        const transactionsResponse = await request<TransactionsResponse>(
          // GRAPHQL_ENDPOINT,
          TRANSACTIONS_QUERY,
          { userID: null, transactionID: null } // Pass null values to get all transactions
        );

        // Fetch transaction statuses
        const statusesResponse = await request(
          GRAPHQL_ENDPOINT,
          TRANSACTION_STATUSES_QUERY
        );

        // Fetch transaction types
        const typesResponse = await request(
          GRAPHQL_ENDPOINT,
          TRANSACTION_TYPES_QUERY
        );

        setTransactions(transactionsResponse.transactions);
        setTransactionStatuses(statusesResponse.transactionStatuses);
        setTransactionTypes(typesResponse.transactionTypes);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;

  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = selectedStatus === 'all' || 
      transaction.transactionStatus.id.toString() === selectedStatus;
    const typeMatch = selectedType === 'all' || 
      transaction.transactionType.id.toString() === selectedType;
    return statusMatch && typeMatch;
  });

  // Add user information to the chart data
  const chartData = transactions.map(transaction => ({
    date: new Date(transaction.dateTime).toLocaleDateString(),
    amount: transaction.amount,
    user: `${transaction.user.firstName} ${transaction.user.lastName}`
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Transactions Overview</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p>Date: {payload[0].payload.date}</p>
                          <p>Amount: ${payload[0].value}</p>
                          <p>User: {payload[0].payload.user}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 mb-4">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {transactionStatuses.map(status => (
              <SelectItem key={status.id} value={status.id.toString()}>
                {status.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {transactionTypes.map(type => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.dateTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {`${transaction.user.firstName} ${transaction.user.lastName}`}
                  </TableCell>
                  <TableCell>{transaction.transactionType.name}</TableCell>
                  <TableCell>{transaction.transactionCategory.name}</TableCell>
                  <TableCell>{transaction.transactionStatus.name}</TableCell>
                  <TableCell className="text-right">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}