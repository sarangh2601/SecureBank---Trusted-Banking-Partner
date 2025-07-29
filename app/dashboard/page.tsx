"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LogOut,
  Plus,
  Minus,
  History,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PieChart,
  BarChart3,
  Calendar,
  Download,
  Bell,
  Moon,
  Sun,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Shield,
  Landmark,
} from "lucide-react"
import { useTheme } from "next-themes"

interface Account {
  accountNumber: string
  fullName: string
  email: string
  balance: number
}

interface Transaction {
  id: number
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
}

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [account, setAccount] = useState<Account | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const accountNumber = localStorage.getItem("accountNumber")
    if (!accountNumber) {
      router.push("/login")
      return
    }

    fetchAccountData(accountNumber)
    fetchTransactions(accountNumber)
  }, [router])

  const fetchAccountData = async (accountNumber: string) => {
    try {
      const response = await fetch(`/api/account/${accountNumber}`)
      if (response.ok) {
        const data = await response.json()
        setAccount(data)
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error("Error fetching account data:", error)
    }
  }

  const fetchTransactions = async (accountNumber: string) => {
    try {
      const response = await fetch(`/api/transactions/${accountNumber}`)
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const handleTransaction = async (type: "credit" | "debit") => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      setMessage("Please enter a valid amount")
      return
    }

    if (type === "debit" && account && Number.parseFloat(amount) > account.balance) {
      setMessage("Insufficient balance")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: account?.accountNumber,
          type,
          amount: Number.parseFloat(amount),
          description: description || `${type === "credit" ? "Credit" : "Debit"} transaction`,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`${type === "credit" ? "Credit" : "Debit"} successful!`)
        setAmount("")
        setDescription("")
        fetchAccountData(account!.accountNumber)
        fetchTransactions(account!.accountNumber)
      } else {
        setMessage(result.error || "Transaction failed")
      }
    } catch (error) {
      setMessage("An error occurred during transaction")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accountNumber")
    router.push("/")
  }

  const getRecentTransactions = () => transactions.slice(0, 5)
  const getTotalCredits = () => transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)
  const getTotalDebits = () => transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0)

  if (!mounted) {
    return null
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00366F] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-[#00366F] p-2 rounded-lg">
                <Landmark className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-[#00366F]">SecureBank</span>
                <div className="flex items-center">
                  <Shield className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Dashboard</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 bg-transparent">
                <Bell className="h-4 w-4 text-[#00366F]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-gray-300 dark:border-gray-600"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-[#00366F]">Welcome back,</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{account.fullName}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#00366F] text-white border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">${account.balance.toFixed(2)}</p>
                  <p className="text-sm opacity-75">Account: {account.accountNumber}</p>
                </div>
                <Wallet className="h-8 w-8 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Total Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">${Number(getTotalCredits()).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                Total Debits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">${Number(getTotalDebits()).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
                </div>
                <ArrowDownRight className="h-6 w-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <History className="h-4 w-4 mr-2 text-[#00366F]" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#00366F]">{transactions.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total count</p>
                </div>
                <BarChart3 className="h-6 w-6 text-[#00366F]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="transactions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-[#00366F] data-[state=active]:text-white"
                >
                  Make Transaction
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-[#00366F] data-[state=active]:text-white"
                >
                  Transaction History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#00366F]">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Make a Transaction
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Credit or debit money from your account securely
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="flex items-center text-[#00366F]">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Amount (USD)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="h-12 text-lg border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center text-[#00366F]">
                          <History className="h-4 w-4 mr-2" />
                          Description (Optional)
                        </Label>
                        <Input
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Transaction description"
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F]"
                        />
                      </div>
                    </div>

                    {message && (
                      <Alert
                        className={`border-0 ${message.includes("successful")
                            ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                            : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                          }`}
                      >
                        <AlertDescription className="flex items-center">
                          {message.includes("successful") ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 mr-2" />
                          )}
                          {message}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={() => handleTransaction("credit")}
                        disabled={isLoading}
                        className="h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Credit Money
                      </Button>
                      <Button
                        onClick={() => handleTransaction("debit")}
                        disabled={isLoading}
                        className="h-12 bg-red-600 hover:bg-red-700 text-white shadow-lg"
                      >
                        <Minus className="h-4 w-4 mr-2" />
                        Debit Money
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center text-[#00366F]">
                          <History className="h-5 w-5 mr-2" />
                          Transaction History
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          View your recent transactions and account activity
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          Your transaction history will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`p-3 rounded-full ${transaction.type === "credit"
                                    ? "bg-green-100 dark:bg-green-900/50 text-green-600"
                                    : "bg-red-100 dark:bg-red-900/50 text-red-600"
                                  }`}
                              >
                                {transaction.type === "credit" ? (
                                  <ArrowUpRight className="h-5 w-5" />
                                ) : (
                                  <ArrowDownRight className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-[#00366F]">{transaction.description}</p>
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </p>
                                  <Badge
                                    variant={transaction.type === "credit" ? "default" : "secondary"}
                                    className={
                                      transaction.type === "credit"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                                    }
                                  >
                                    {transaction.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`text-lg font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-[#00366F]">
                  <PieChart className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Account Health</span>
                    <span className="font-medium text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Goal</span>
                    <span className="font-medium text-[#00366F]">$2,500</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Transaction</span>
                    <span className="text-sm font-medium text-[#00366F]">
                      {transactions.length > 0 ? new Date(transactions[0].date).toLocaleDateString() : "None"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-[#00366F]">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getRecentTransactions().length === 0 ? (
                  <div className="text-center py-8">
                    <History className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getRecentTransactions().map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${transaction.type === "credit"
                                ? "bg-green-100 dark:bg-green-900/50 text-green-600"
                                : "bg-red-100 dark:bg-red-900/50 text-red-600"
                              }`}
                          >
                            {transaction.type === "credit" ? (
                              <Plus className="h-3 w-3" />
                            ) : (
                              <Minus className="h-3 w-3" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#00366F] truncate max-w-[120px]">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-[#00366F] text-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Account Protection</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Two-Factor Auth</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">SSL Encryption</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="pt-3 border-t border-white/20">
                    <p className="text-sm opacity-90">Your account is fully secured</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
