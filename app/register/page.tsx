"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  Eye,
  EyeOff,
  Check,
  X,
  User,
  Mail,
  Phone,
  Lock,
  DollarSign,
  Moon,
  Sun,
  Shield,
  Sparkles,
  Building2,
  CreditCard,
  Landmark,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

interface ValidationState {
  fullName: { isValid: boolean; message: string }
  email: { isValid: boolean; message: string }
  phone: { isValid: boolean; message: string }
  password: { isValid: boolean; message: string }
  confirmPassword: { isValid: boolean; message: string }
  initialDeposit: { isValid: boolean; message: string }
}

export default function RegisterPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    initialDeposit: "",
  })
  const [validation, setValidation] = useState<ValidationState>({
    fullName: { isValid: false, message: "" },
    email: { isValid: false, message: "" },
    phone: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" },
    initialDeposit: { isValid: false, message: "" },
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateField = (name: string, value: string) => {
    let isValid = false
    let message = ""

    switch (name) {
      case "fullName":
        isValid = value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value)
        message = isValid ? "✓ Valid name" : "Name must be at least 2 characters and contain only letters"
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        isValid = emailRegex.test(value)
        message = isValid ? "✓ Valid email" : "Please enter a valid email address"
        break
      case "phone":
        const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
        isValid = phoneRegex.test(value)
        message = isValid ? "✓ Valid phone number" : "Please enter a valid phone number"
        break
      case "password":
        const hasLength = value.length >= 8
        const hasUpper = /[A-Z]/.test(value)
        const hasLower = /[a-z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)

        let strength = 0
        if (hasLength) strength += 20
        if (hasUpper) strength += 20
        if (hasLower) strength += 20
        if (hasNumber) strength += 20
        if (hasSpecial) strength += 20

        setPasswordStrength(strength)
        isValid = strength >= 80

        if (strength < 40) message = "Weak password"
        else if (strength < 80) message = "Medium strength password"
        else message = "✓ Strong password"
        break
      case "confirmPassword":
        isValid = value === formData.password && value.length > 0
        message = isValid ? "✓ Passwords match" : "Passwords do not match"
        break
      case "initialDeposit":
        const amount = Number.parseFloat(value)
        isValid = !isNaN(amount) && amount >= 10
        message = isValid ? "✓ Valid deposit amount" : "Minimum deposit is $10"
        break
    }

    setValidation((prev) => ({
      ...prev,
      [name]: { isValid, message },
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Final validation
    const allValid = Object.values(validation).every((field) => field.isValid)
    if (!allValid) {
      setMessage("Please fix all validation errors before submitting")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(
          `🎉 Account created successfully! Your account number is: ${result.accountNumber}. Please save this number for login.`,
        )
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          initialDeposit: "",
        })
      } else {
        setMessage(result.error || "Registration failed")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500"
    if (passwordStrength < 80) return "bg-yellow-500"
    return "bg-[#00366F]"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak"
    if (passwordStrength < 80) return "Medium"
    return "Strong"
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">FDIC Insured</span>
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
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white bg-transparent"
                >
                  Sign In
                </Button>
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
                <h1 className="text-4xl font-bold text-[#00366F] mb-4">Join SecureBank Today</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Experience modern banking with industry-leading security and customer service.
                </p>
              </div>

              {/* Banking Image Placeholder */}
              <div className="relative">
                <div className="bg-[#00366F] rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Building2 className="h-24 w-24 mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-semibold mb-2">Modern Banking</h3>
                      <p className="text-blue-100">Secure • Reliable • Innovative</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">Bank-Grade Security</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">256-bit encryption</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">Instant Transfers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time processing</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <Banknote className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">No Hidden Fees</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transparent pricing</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-[#00366F] p-2 rounded-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00366F]">24/7 Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div>
              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-[#00366F]">Create Your Account</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Fill in your details to get started with SecureBank
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-[#00366F]">
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`pl-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.fullName.isValid
                                ? "border-green-500"
                                : formData.fullName
                                  ? "border-red-500"
                                  : ""
                            }`}
                            placeholder="Enter your full name"
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {formData.fullName && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {validation.fullName.isValid ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {formData.fullName && (
                          <p className={`text-xs ${validation.fullName.isValid ? "text-green-600" : "text-red-600"}`}>
                            {validation.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-[#00366F]">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`pl-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.email.isValid ? "border-green-500" : formData.email ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your email"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {formData.email && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {validation.email.isValid ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {formData.email && (
                          <p className={`text-xs ${validation.email.isValid ? "text-green-600" : "text-red-600"}`}>
                            {validation.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Initial Deposit Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-[#00366F]">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`pl-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.phone.isValid ? "border-green-500" : formData.phone ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your phone"
                            required
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {formData.phone && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {validation.phone.isValid ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {formData.phone && (
                          <p className={`text-xs ${validation.phone.isValid ? "text-green-600" : "text-red-600"}`}>
                            {validation.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="initialDeposit" className="text-sm font-medium text-[#00366F]">
                          Initial Deposit (USD)
                        </Label>
                        <div className="relative">
                          <Input
                            id="initialDeposit"
                            name="initialDeposit"
                            type="number"
                            min="10"
                            step="0.01"
                            value={formData.initialDeposit}
                            onChange={handleChange}
                            className={`pl-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.initialDeposit.isValid
                                ? "border-green-500"
                                : formData.initialDeposit
                                  ? "border-red-500"
                                  : ""
                            }`}
                            placeholder="Minimum $10.00"
                            required
                          />
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {formData.initialDeposit && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {validation.initialDeposit.isValid ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {formData.initialDeposit && (
                          <p
                            className={`text-xs ${validation.initialDeposit.isValid ? "text-green-600" : "text-red-600"}`}
                          >
                            {validation.initialDeposit.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            className={`pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.password.isValid
                                ? "border-green-500"
                                : formData.password
                                  ? "border-red-500"
                                  : ""
                            }`}
                            placeholder="Create password"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {formData.password && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Password strength:</span>
                              <Badge
                                variant={
                                  passwordStrength >= 80
                                    ? "default"
                                    : passwordStrength >= 40
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  passwordStrength >= 80
                                    ? "bg-[#00366F] text-white"
                                    : passwordStrength >= 40
                                      ? "bg-yellow-500 text-white"
                                      : "bg-red-500 text-white"
                                }
                              >
                                {getPasswordStrengthText()}
                              </Badge>
                            </div>
                            <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
                            <p className={`text-xs ${validation.password.isValid ? "text-green-600" : "text-red-600"}`}>
                              {validation.password.message}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#00366F]">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-[#00366F] focus:ring-[#00366F] ${
                              validation.confirmPassword.isValid
                                ? "border-green-500"
                                : formData.confirmPassword
                                  ? "border-red-500"
                                  : ""
                            }`}
                            placeholder="Confirm password"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {formData.confirmPassword && (
                          <p
                            className={`text-xs ${validation.confirmPassword.isValid ? "text-green-600" : "text-red-600"}`}
                          >
                            {validation.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {message && (
                      <Alert
                        className={`border-0 ${
                          message.includes("successfully")
                            ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                            : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                        }`}
                      >
                        <AlertDescription className="flex items-center">
                          {message.includes("successfully") ? (
                            <Sparkles className="h-4 w-4 mr-2" />
                          ) : (
                            <X className="h-4 w-4 mr-2" />
                          )}
                          {message}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#00366F] hover:bg-[#002952] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={isLoading || !Object.values(validation).every((field) => field.isValid)}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Your Account...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Create My Account
                        </div>
                      )}
                    </Button>

                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Shield className="h-4 w-4" />
                        <span>Your data is protected with bank-grade encryption</span>
                      </div>

                      <Link
                        href="/login"
                        className="text-sm text-[#00366F] hover:text-[#002952] font-medium hover:underline transition-colors"
                      >
                        Already have an account? Sign in here
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Landmark className="h-6 w-6 text-[#00366F]" />
                </div>
                <span className="ml-3 text-xl font-bold">SecureBank</span>
              </div>
              <p className="text-blue-100 mb-4 max-w-md">
                Your trusted partner for secure and innovative banking solutions. We're committed to providing
                exceptional financial services with the highest level of security.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>FDIC Insured</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>SSL Secured</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-blue-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personal Banking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business Banking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Loans & Credit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investment Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              &copy; 2024 SecureBank. All rights reserved. Member FDIC. Equal Housing Lender.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-blue-100">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
