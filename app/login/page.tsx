"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  Lock,
  User,
  Moon,
  Sun,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Landmark,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Check for remembered account
    const rememberedAccount = localStorage.getItem("rememberedAccount")
    if (rememberedAccount) {
      setFormData((prev) => ({ ...prev, accountNumber: rememberedAccount }))
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedAccount", formData.accountNumber)
        } else {
          localStorage.removeItem("rememberedAccount")
        }

        localStorage.setItem("accountNumber", formData.accountNumber)
        router.push("/dashboard")
      } else {
        setMessage(result.error || "Login failed")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!mounted) {
    return null
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">Secure Login</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-gray-300 dark:border-gray-600"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/register">
                <Button className="bg-[#00366F] hover:bg-[#002952] text-white">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Banking Image and Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-[#00366F] mb-4">Welcome Back</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Sign in to access your secure banking dashboard and manage your finances.
                </p>
              </div>

              {/* Banking Image Placeholder */}
              <div className="relative">
                <div className="bg-[#00366F] rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Building2 className="h-24 w-24 mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
                      <p className="text-blue-100">Your trusted financial partner</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">Multi-Factor Auth</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced security</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">SSL Encryption</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">256-bit protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div>
              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-[#00366F]">Sign In to Your Account</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Enter your credentials to access your banking dashboard
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber" className="text-sm font-medium text-[#00366F]">
                        Account Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="accountNumber"
                          name="accountNumber"
                          type="text"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          className="pl-10 h-12 text-lg border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F]"
                          placeholder="Enter your account number"
                          required
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-[#00366F]">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 pr-12 h-12 text-lg border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F]"
                          placeholder="Enter your password"
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          className="border-gray-300 data-[state=checked]:bg-[#00366F]"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                          Remember account number
                        </Label>
                      </div>
                      <Link href="#" className="text-sm text-[#00366F] hover:text-[#002952] font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    {message && (
                      <Alert
                        className={`border-0 ${
                          message.includes("successful")
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

                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#00366F] hover:bg-[#002952] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Sign In to Account
                        </div>
                      )}
                    </Button>

                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Shield className="h-4 w-4" />
                        <span>Protected by 256-bit SSL encryption</span>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">New to SecureBank?</span>
                        </div>
                      </div>

                      <Link href="/register">
                        <Button
                          variant="outline"
                          className="w-full h-12 border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white bg-transparent"
                        >
                          Create Your Account
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#00366F] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Landmark className="h-6 w-6 text-[#00366F]" />
              </div>
              <span className="ml-3 text-xl font-bold">SecureBank</span>
            </div>
            <p className="text-blue-100 text-sm">
              &copy; 2024 SecureBank. All rights reserved. Member FDIC. Your deposits are insured up to $250,000.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
