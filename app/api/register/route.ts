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

// Generate account number
function generateAccountNumber(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString()
}

export async function POST(request: NextRequest) {
  let connection: mysql.Connection | null = null

  try {
    const body = await request.json()
    const { fullName, email, phone, password, initialDeposit } = body

    console.log("Registration attempt:", { fullName, email, phone, initialDeposit })

    // Validate input
    if (!fullName || !email || !phone || !password || !initialDeposit) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const depositAmount = Number.parseFloat(initialDeposit)
    if (isNaN(depositAmount) || depositAmount < 10) {
      return NextResponse.json({ error: "Minimum initial deposit is $10" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    console.log("Connecting to database with config:", {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
    })

    // Create database connection
    try {
      connection = await mysql.createConnection(dbConfig)
      console.log("Database connection established")
    } catch (dbError) {
      console.error("Database connection error:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed. Please check your database configuration.",
        },
        { status: 500 },
      )
    }

    try {
      // Check if email already exists
      const [existingUsers] = await connection.execute("SELECT id FROM accounts WHERE email = ?", [email])

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Generate unique account number
      let accountNumber: string
      let isUnique = false
      let attempts = 0

      do {
        accountNumber = generateAccountNumber()
        const [existing] = await connection.execute("SELECT id FROM accounts WHERE account_number = ?", [accountNumber])
        isUnique = Array.isArray(existing) && existing.length === 0
        attempts++

        if (attempts > 10) {
          throw new Error("Unable to generate unique account number")
        }
      } while (!isUnique)

      console.log("Generated account number:", accountNumber)

      // Start transaction
      await connection.beginTransaction()

      try {
        // Insert new account
        const [accountResult] = await connection.execute(
          `INSERT INTO accounts (account_number, full_name, email, phone, password, balance, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [accountNumber, fullName, email, phone, hashedPassword, depositAmount],
        )

        console.log("Account created successfully")

        // Record initial deposit transaction
        await connection.execute(
          `INSERT INTO transactions (account_number, type, amount, description, created_at) 
           VALUES (?, 'credit', ?, 'Initial deposit', NOW())`,
          [accountNumber, depositAmount],
        )

        console.log("Initial transaction recorded")

        // Commit transaction
        await connection.commit()

        return NextResponse.json({
          message: "Account created successfully",
          accountNumber,
          success: true,
        })
      } catch (insertError) {
        await connection.rollback()
        console.error("Insert error:", insertError)
        throw insertError
      }
    } catch (queryError) {
      console.error("Query error:", queryError)
      return NextResponse.json(
        {
          error: "Database operation failed. Please try again.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Registration failed. Please try again later.",
      },
      { status: 500 },
    )
  } finally {
    if (connection) {
      try {
        await connection.end()
        console.log("Database connection closed")
      } catch (closeError) {
        console.error("Error closing connection:", closeError)
      }
    }
  }
}
