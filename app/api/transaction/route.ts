import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "banking_app",
}

export async function POST(request: NextRequest) {
  try {
    const { accountNumber, type, amount, description } = await request.json()

    // Validate input
    if (!accountNumber || !type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid transaction data" }, { status: 400 })
    }

    if (type !== "credit" && type !== "debit") {
      return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 })
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig)

    try {
      // Start transaction
      await connection.beginTransaction()

      // Get current balance
      const [accounts] = await connection.execute("SELECT balance FROM accounts WHERE account_number = ? FOR UPDATE", [
        accountNumber,
      ])

      if (!Array.isArray(accounts) || accounts.length === 0) {
        await connection.rollback()
        return NextResponse.json({ error: "Account not found" }, { status: 404 })
      }

      const currentBalance = Number.parseFloat((accounts[0] as any).balance)

      // Check for sufficient balance on debit
      if (type === "debit" && currentBalance < amount) {
        await connection.rollback()
        return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
      }

      // Calculate new balance
      const newBalance = type === "credit" ? currentBalance + amount : currentBalance - amount

      // Update account balance
      await connection.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", [newBalance, accountNumber])

      // Record transaction
      await connection.execute(
        `INSERT INTO transactions (account_number, type, amount, description, created_at) 
         VALUES (?, ?, ?, ?, NOW())`,
        [accountNumber, type, amount, description],
      )

      // Commit transaction
      await connection.commit()

      return NextResponse.json({
        message: "Transaction successful",
        newBalance,
      })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
