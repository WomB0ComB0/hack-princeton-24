import { fetchTransactionsByUserId } from '@/api'
import type { transaction, transactionStatus, transactionType } from '@/api'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// import { useAuth } from '@/core/auth'
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useEffect, useState } from 'react'

const LoadingSkeleton = () => {
  return (
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
  )
}

const ErrorAlert = ({ message }: { message: string }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

const TransactionChart = ({
  transactions,
}: {
  transactions: transaction[]
}) => {
  const chartData = transactions.map((transaction) => ({
    date: new Date(transaction.date_time).toLocaleDateString(),
    amount: transaction.amount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>Your transaction history over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const TransactionHistory = ({
  transactions,
  selectedStatus,
  selectedType,
  onStatusChange,
  onTypeChange,
}: {
  transactions: transaction[]
  selectedStatus: string
  selectedType: string
  onStatusChange: (value: string) => void
  onTypeChange: (value: string) => void
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Detailed view of your transactions</CardDescription>
        <div className="flex gap-4 mt-4">
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {/* Add status options dynamically */}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {/* Add type options dynamically */}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date_time).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.transaction_type_id}</TableCell>
                <TableCell>{transaction.transaction_status_id}</TableCell>
                <TableCell className="text-right">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TransactionsDashboard() {
  // const { currentUser } = useAuth()
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   async function loadData() {
  //     if (!currentUser) return

  //     try {
  //       setLoading(true)
  //       const transactionsData = await fetchTransactionsByUserId(
  //         currentUser.uid,
  //       )
  //       setTransactions(transactionsData)
  //     } catch (error) {
  //       setError(
  //         error instanceof Error
  //           ? error.message
  //           : 'Error fetching transactions',
  //       )
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   loadData()
  // }, [currentUser])

  // if (currentUser === undefined) {
  //   return <LoadingSkeleton />
  // }

  // if (error) {
  //   return <ErrorAlert message={error} />
  // }

  // if (!currentUser) {
  //   return <ErrorAlert message="Please log in to view your transactions." />
  // }

  const filteredTransactions = transactions.filter((transaction) => {
    const statusMatch =
      selectedStatus === 'all' ||
      transaction.transaction_status_id.toString() === selectedStatus
    const typeMatch =
      selectedType === 'all' ||
      transaction.transaction_type_id.toString() === selectedType
    return statusMatch && typeMatch
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Transactions for {'User'}
      </h1>
      <TransactionChart transactions={filteredTransactions} />
      <TransactionHistory
        transactions={filteredTransactions}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        onStatusChange={setSelectedStatus}
        onTypeChange={setSelectedType}
      />
    </div>
  )
}

export const Route = createFileRoute('/dashboard/planner')({
  component: TransactionsDashboard,
})