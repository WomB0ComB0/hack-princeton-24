package dblayer

import (
	"database/sql"
	"hackprinceton/pkg/models"
)

// Extract Transaction data from the database
func GetTransactions() []models.Transaction {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	rows, err := db.Query("SELECT * FROM transactions")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the transactions
	transactions := []models.Transaction{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new transaction
		transaction := models.Transaction{}

		var transactionID sql.NullInt64
		var userID sql.NullString
		var transactionTypeID sql.NullInt64
		var currencyID sql.NullInt64
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the transaction
		err := rows.Scan(&transactionID, &userID, &transactionTypeID, &currencyID, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the transaction fields
		transaction.ID = int(transactionID.Int64)
		transaction.UserID = userID.String
		transaction.TransactionTypeID = int(transactionTypeID.Int64)
		transaction.CurrencyID = int(currencyID.Int64)
		transaction.Amount = amount.Float64
		transaction.DateTime = dateTime.String

		// Append the transaction to the slice
		transactions = append(transactions, transaction)
	}

	return transactions
}

// Extract AccountBalance data from the database
func GetAccountBalances() []models.AccountBalance {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	rows, err := db.Query("SELECT * FROM account_balances")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the account balances
	accountBalances := []models.AccountBalance{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new account balance
		accountBalance := models.AccountBalance{}

		var accountBalanceID sql.NullInt64
		var bankAccountID sql.NullInt64
		var currencyID sql.NullInt64
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the account balance
		err := rows.Scan(&accountBalanceID, &bankAccountID, &currencyID, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the account balance fields
		accountBalance.ID = int(accountBalanceID.Int64)
		accountBalance.BankAccountID = int(bankAccountID.Int64)
		accountBalance.CurrencyID = int(currencyID.Int64)
		accountBalance.Amount = amount.Float64
		accountBalance.DateTime = dateTime.String

		// Append the account balance to the slice
		accountBalances = append(accountBalances, accountBalance)
	}

	return accountBalances
}

// Extract BankAccount data from the database
func GetBankAccounts() []models.BankAccount {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	rows, err := db.Query("SELECT * FROM bank_accounts")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the bank accounts
	bankAccounts := []models.BankAccount{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new bank account
		bankAccount := models.BankAccount{}

		var bankAccountID sql.NullInt64
		var bankID sql.NullInt64
		var bankAccountTypeID sql.NullInt64
		var statusID sql.NullInt64
		var accountNumber sql.NullString
		var routingNumber sql.NullString

		// Scan the row into the bank account
		err := rows.Scan(&bankAccountID, &bankID, &bankAccountTypeID, &statusID, &accountNumber, &routingNumber)
		if err != nil {
			panic(err)
		}

		// Set the bank account fields
		bankAccount.ID = int(bankAccountID.Int64)
		bankAccount.BankID = int(bankID.Int64)
		bankAccount.BankAccountTypeID = int(bankAccountTypeID.Int64)
		bankAccount.StatusID = int(statusID.Int64)
		bankAccount.AccountNumber = accountNumber.String
		bankAccount.RoutingNumber = routingNumber.String

		// Append the bank account to the slice
		bankAccounts = append(bankAccounts, bankAccount)
	}

	return bankAccounts
}

// Extract Users data from the database
func GetUsers() []models.User {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the users
	users := []models.User{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new user
		user := models.User{}

		var userID sql.NullString
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString

		// Scan the row into the user
		err := rows.Scan(&userID, &firstName, &lastName, &birthdate)
		if err != nil {
			panic(err)
		}

		// Set the user fields
		user.ID = userID.String
		user.FirstName = firstName.String
		user.LastName = lastName.String
		user.Birthdate = birthdate.String

		// Append the user to the slice
		users = append(users, user)
	}

	return users
}

