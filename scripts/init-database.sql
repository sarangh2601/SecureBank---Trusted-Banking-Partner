-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS banking_app 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE banking_app;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;

-- Create accounts table with proper constraints
CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00 CHECK (balance >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_account_number (account_number),
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- Create transactions table with proper foreign key
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL,
    type ENUM('credit', 'debit') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_account_number (account_number),
    INDEX idx_created_at (created_at),
    INDEX idx_type (type),
    
    FOREIGN KEY (account_number) REFERENCES accounts(account_number) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Insert a test account for verification (optional)
-- Password is 'password123' hashed with bcrypt
INSERT INTO accounts (account_number, full_name, email, phone, password, balance) VALUES 
('123456789', 'Test User', 'test@example.com', '1234567890', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 100.00);

-- Insert initial transaction for test account
INSERT INTO transactions (account_number, type, amount, description) VALUES 
('123456789', 'credit', 100.00, 'Initial deposit');

-- Show tables to verify creation
SHOW TABLES;

-- Show account structure
DESCRIBE accounts;

-- Show transactions structure  
DESCRIBE transactions;

-- Display test data
SELECT * FROM accounts;
SELECT * FROM transactions;
