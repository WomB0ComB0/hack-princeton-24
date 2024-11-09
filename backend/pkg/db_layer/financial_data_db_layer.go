package db_layer

import (
	"database/sql"
	"hackprinceton/pkg/models"
)

// Extract Transaction data from the database for a given user and transaction
// If the user ID is empty, return all transactions
// If only the user ID is provided, return all transactions for that user
func GetTransactions(userID string, transactionID string) []models.Transaction {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query("SELECT * FROM transactions")
	} else {
		if transactionID == "" {
			rows, err = db.Query("SELECT * FROM transactions WHERE user_id = ?", userID)
		} else {
			rows, err = db.Query("SELECT * FROM transactions WHERE user_id = ? AND id = ?", userID, transactionID)
		}
	}
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

// Extract AccountBalance data from the database for a given user and bank account
// If the user ID is empty, return all account balances
// If only the user ID is provided, return all account balances for that user
func GetAccountBalances(userID string, bankAccountID string) []models.AccountBalance {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query("SELECT * FROM accountbalances")
	} else {
		if bankAccountID == "" {
			rows, err = db.Query("SELECT * FROM accountbalances WHERE user_id = ?", userID)
		} else {
			rows, err = db.Query("SELECT * FROM accountbalances WHERE user_id = ? AND bank_account_id = ?", userID, bankAccountID)
		}
	}
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

// Extract BankAccount data from the database for a given bank user
// If the user ID is empty, return all bank accounts
func GetBankAccounts(userID string) []models.BankAccount {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query("SELECT * FROM bankaccounts")
	} else {
		rows, err = db.Query("SELECT * FROM bankaccounts WHERE user_id = ?", userID)
	}
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
		var userID sql.NullString
		var bankAccountTypeID sql.NullInt64
		var statusID sql.NullInt64

		// Scan the row into the bank account
		err := rows.Scan(&bankAccountID, &bankID, &userID, &bankAccountTypeID, &statusID)
		if err != nil {
			panic(err)
		}

		// Set the bank account fields
		bankAccount.ID = int(bankAccountID.Int64)
		bankAccount.BankID = int(bankID.Int64)
		bankAccount.UserID = userID.String
		bankAccount.BankAccountTypeID = int(bankAccountTypeID.Int64)
		bankAccount.StatusID = int(statusID.Int64)

		// Append the bank account to the slice
		bankAccounts = append(bankAccounts, bankAccount)
	}

	return bankAccounts
}

// Extract Users data from the database for a given user
// If the user ID is empty, return all users
func GetUsers(userID string) []models.User {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query("SELECT * FROM users")
	} else {
		rows, err = db.Query("SELECT * FROM users WHERE id = ?", userID)
	}
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
		var email sql.NullString
		var phoneNumber sql.NullString

		// Scan the row into the user
		err := rows.Scan(&userID, &firstName, &lastName, &birthdate, &email, &phoneNumber)
		if err != nil {
			panic(err)
		}

		// Set the user fields
		user.ID = userID.String
		user.FirstName = firstName.String
		user.LastName = lastName.String
		user.Birthdate = birthdate.String
		user.Email = email.String
		user.PhoneNumber = phoneNumber.String

		// Append the user to the slice
		users = append(users, user)
	}

	return users
}

// Extract Messages data from the database for a given user
// If the user ID is empty, return all messages
func GetMessages(userID string) []models.Message {
	// Connect to the database
	db := ConnectToDB()

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query("SELECT * FROM messages")
	} else {
		rows, err = db.Query("SELECT * FROM messages WHERE user_id = ?", userID)
	}
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the messages
	messages := []models.Message{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new message
		message := models.Message{}

		var messageID sql.NullInt64
		var userID sql.NullString
		var content sql.NullString

		// Scan the row into the message
		err := rows.Scan(&messageID, &userID, &content)
		if err != nil {
			panic(err)
		}

		// Set the message fields
		message.ID = int(messageID.Int64)
		message.UserID = userID.String
		message.Content = content.String

		// Append the message to the slice
		messages = append(messages, message)
	}

	return messages
}
