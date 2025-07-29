import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "banking_app",
}

export async function POST(request: NextRequest) {
  try {
    const { accountNumber, password } = await request.json()

    // Validate input
    if (!accountNumber || !password) {
      return NextResponse.json({ error: "Account number and password are required" }, { status: 400 })
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig)

    try {
      // Find account
      const [accounts] = await connection.execute(
        "SELECT id, account_number, full_name, email, password FROM accounts WHERE account_number = ?",
        [accountNumber],
      )

      if (!Array.isArray(accounts) || accounts.length === 0) {
        return NextResponse.json({ error: "Invalid account number or password" }, { status: 401 })
      }

      const account = accounts[0] as any

      // Verify password
      const isValidPassword = await bcrypt.compare(password, account.password)

      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid account number or password" }, { status: 401 })
      }

      return NextResponse.json({
        message: "Login successful",
        accountNumber: account.account_number,
        fullName: account.full_name,
      })
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
