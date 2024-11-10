import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { fetchAllAccountBalances, fetchTransactionsByUserId } from '@/api'
import type { transaction, accountBalance } from '@/api'
import { useUserContext } from '../user_context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { AlertCircle, DollarSign, TrendingUp } from 'lucide-react'

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

const AccountSummary = ({ balances }: { balances: accountBalance[] }) => {
  const totalBalance = balances.reduce((sum, balance) => sum + balance.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
        <CardDescription>Overview of your account balances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Balance</p>
          </div>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" /> Add Funds
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const RecentTransactions = ({ transactions }: { transactions: transaction[] }) => {
  const recentTransactions = transactions.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date_time).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.transaction_type_id}</TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function Planner() {
  const { user, loading: userLoading } = useUserContext()
  const [accountBalances, setAccountBalances] = useState<accountBalance[]>([])
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      if (userLoading || !user) return

      try {
        setLoading(true)
        const [balances, transactionsData] = await Promise.all([
          fetchAllAccountBalances(),
          fetchTransactionsByUserId(user.id)
        ])
        setAccountBalances(balances)
        setTransactions(transactionsData)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, userLoading])

  if (userLoading || loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!user) {
    return <ErrorAlert message="Please log in to view your planner." />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Planner for {user.first_name} {user.last_name}</h1>
      <AccountSummary balances={accountBalances} />
      <RecentTransactions transactions={transactions} />
    </div>
  )
}

export const Route = createFileRoute('/dashboard/planner')({
  component: Planner,
})

export default Planner

