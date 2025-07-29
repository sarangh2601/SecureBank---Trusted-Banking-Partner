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
      // Get transactions
      const [transactions] = await connection.execute(
        `SELECT id, type, amount, description, created_at as date 
         FROM transactions 
         WHERE account_number = ? 
         ORDER BY created_at DESC 
         LIMIT 50`,
        [accountNumber],
      )

      return NextResponse.json(transactions)
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Transactions fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
