import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "banking_app",
}

export async function GET(request: NextRequest, { params }: { params: { accountNumber: string } }) {
  try {
    const { accountNumber } = params

    // Create database connection
    const connection = await mysql.createConnection(dbConfig)

    try {
      // Get account details
      const [accounts] = await connection.execute(
        "SELECT account_number, full_name, email, balance FROM accounts WHERE account_number = ?",
        [accountNumber],
      )

      if (!Array.isArray(accounts) || accounts.length === 0) {
        return NextResponse.json({ error: "Account not found" }, { status: 404 })
      }

      const account = accounts[0] as any

      return NextResponse.json({
        accountNumber: account.account_number,
        fullName: account.full_name,
        email: account.email,
        balance: Number.parseFloat(account.balance),
      })
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Account fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
