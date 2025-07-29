"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
  Lock,
  TrendingUp,
  Award,
  Moon,
  Sun,
  Menu,
  X,
  Landmark,
  Building2,
  Phone,
  Mail,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#security"
                className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
              >
                Security
              </a>
              <a
                href="#testimonials"
                className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
              >
                Reviews
              </a>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-gray-300 dark:border-gray-600"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#00366F] hover:bg-[#002952] text-white shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-gray-300 dark:border-gray-600 bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
                >
                  Features
                </a>
                <a
                  href="#security"
                  className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
                >
                  Security
                </a>
                <a
                  href="#testimonials"
                  className="text-[#00366F] hover:text-[#002952] dark:text-blue-300 dark:hover:text-blue-100 transition-colors font-medium"
                >
                  Reviews
                </a>
                <div className="flex items-center space-x-4 pt-4">
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" className="w-full border-[#00366F] text-[#00366F] bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button className="w-full bg-[#00366F] hover:bg-[#002952]">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge className="mb-6 bg-blue-100 dark:bg-blue-900/50 text-[#00366F] dark:text-blue-200 border-blue-200 dark:border-blue-700">
            <Award className="h-3 w-3 mr-1" />
            #1 Digital Bank 2024
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            <span className="text-[#00366F]">Banking Made <br/>Secure</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Experience the future of banking with our award-winning platform. Secure, intuitive, and designed for your
            financial success.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#00366F] hover:bg-[#002952] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg"
              >
                Open Account Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                Sign In to Account
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              FDIC Insured
            </div>
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-green-500" />
              256-bit SSL Encryption
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-green-500" />
              2M+ Happy Customers
            </div>
          </div>
        </div>

        {/* Banking Image Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#00366F] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Building2 className="h-32 w-32 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Modern Banking Experience</h3>
                  <p className="text-blue-100">Secure • Reliable • Innovative</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-[#00366F] p-3 rounded-lg w-fit mb-3">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#00366F] mb-2">Digital Cards</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant virtual cards for secure online shopping
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-[#00366F] p-3 rounded-lg w-fit mb-3">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#00366F] mb-2">Mobile Banking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full banking features in your pocket</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make your financial life easier and more secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">Bank-Grade Security</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Your money and data are protected with military-grade encryption and multi-factor authentication.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">Instant Transactions</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Send and receive money instantly with real-time notifications and balance updates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">Mobile First</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Access your account anywhere, anytime with our award-winning mobile experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">Smart Analytics</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get insights into your spending patterns and financial health with AI-powered analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">Global Access</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Bank from anywhere in the world with 24/7 customer support and global ATM access.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#00366F] rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#00366F]">24/7 Support</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get help whenever you need it with our dedicated customer support team.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="mt-32">
          <div className="bg-[#00366F] rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your Security is Our Priority</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                We use the latest technology to keep your money and personal information safe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-fit mx-auto mb-4">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                <p className="opacity-90">All data is encrypted using AES-256 encryption</p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Factor Auth</h3>
                <p className="opacity-90">Additional security layers protect your account</p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">FDIC Insured</h3>
                <p className="opacity-90">Your deposits are insured up to $250,000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by Millions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our customers are saying about their SecureBank experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                content:
                  "SecureBank has transformed how I manage my business finances. The interface is intuitive and the security features give me peace of mind.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                content:
                  "As a tech person, I appreciate the attention to detail in the app. It's fast, secure, and has all the features I need.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director",
                content:
                  "The customer support is exceptional. They helped me set up my account in minutes and were available whenever I had questions.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                  <div className="mt-4">
                    <p className="font-semibold text-[#00366F]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-[#00366F] mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers and experience the future of banking today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-[#00366F] hover:bg-[#002952] text-white px-8 py-4 text-lg font-semibold"
                >
                  Open Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#00366F] text-[#00366F] hover:bg-[#00366F] hover:text-white px-8 py-4 text-lg bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#00366F] text-white mt-32">
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
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>1-800-SECURE-1</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@securebank.com</span>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find ATM/Branch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security Center
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
