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

	sqlQuery := `SELECT
	transactions.id,
	users.id AS userid,
	CONCAT(users.FirstName, ' ', users.LastName) AS username,
	transactiontypes.id AS transaction_type_id,
	transactiontypes.name AS transaction_type,
	transactioncategories.id AS category_id,
	transactioncategories.name AS category,
	currencies.id AS currency_id,
	currencies.symbol AS currency,
	transactions.amount,
	transactions.datetime
	FROM transactions
	INNER JOIN users ON transactions.userid = users.id
	INNER JOIN transactiontypes ON transactions.transactiontypeid = transactiontypes.id
	INNER JOIN currencies ON transactions.currencyid = currencies.id
	INNER JOIN transactioncategories ON transactions.transactioncategoryid = transactioncategories.id
	`

	// Query the database
	var rows *sql.Rows
	var err error
	if userID == "" {
		rows, err = db.Query(sqlQuery)
	} else {
		if transactionID == "" {
			rows, err = db.Query(sqlQuery+" WHERE transactions.userid = ?", userID)
		} else {
			rows, err = db.Query(sqlQuery+" WHERE transactions.userid = ? AND transactions.id = ?", userID, transactionID)
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

		var transactionID sql.NullString
		var userID sql.NullString
		var username sql.NullString
		var transactionTypeID sql.NullInt64
		var transactionType sql.NullString
		var transactionCategoryID sql.NullInt64
		var transactionCategory sql.NullString
		var currencyID sql.NullInt64
		var currency sql.NullString
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the transaction
		err := rows.Scan(&transactionID, &userID, &username, &transactionTypeID, &transactionType, &transactionCategoryID, &transactionCategory, &currencyID, &currency, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the transaction fields
		transaction.ID = transactionID.String
		transaction.UserID = userID.String
		transaction.Username = username.String
		transaction.TransactionTypeID = int(transactionTypeID.Int64)
		transaction.TransactionType = transactionType.String
		transaction.TransactionCategoryID = int(transactionCategoryID.Int64)
		transaction.TransactionCategory = transactionCategory.String
		transaction.CurrencyID = int(currencyID.Int64)
		transaction.Currency = currency.String
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

	sqlQuery := `SELECT
	accountbalances.id,
	bankaccounts.id AS bankaccountid,
	bankaccounts.bankid,
	banks.name AS bank,
	currencies.id AS currencyid,
	currencies.symbol AS currency,
	accountbalances.amount,
	accountbalances.datetime
	FROM accountbalances
	INNER JOIN bankaccounts ON accountbalances.bankaccountid = bankaccounts.id
	INNER JOIN currencies ON accountbalances.currencyid = currencies.id
	INNER JOIN banks ON bankaccounts.bankid = banks.id
	WHERE 1=1
	`

	// Query the database
	var rows *sql.Rows
	var err error
	if userID != "" {
		sqlQuery += " AND bankaccounts.userid = '" + userID + "'"

		if bankAccountID != "" {
			sqlQuery += " AND bankaccounts.id = '" + bankAccountID + "'"
		}
	}
	rows, err = db.Query(sqlQuery)
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
		var bankAccountID sql.NullString
		var bankID sql.NullString
		var bank sql.NullString
		var currencyID sql.NullInt64
		var currency sql.NullString
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the account balance
		err := rows.Scan(&accountBalanceID, &bankAccountID, &bankID, &bank, &currencyID, &currency, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the account balance fields
		accountBalance.ID = int(accountBalanceID.Int64)
		accountBalance.BankAccountID = bankAccountID.String
		accountBalance.BankID = bankID.String
		accountBalance.Bank = bank.String
		accountBalance.CurrencyID = int(currencyID.Int64)
		accountBalance.Currency = currency.String
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
	sqlQuery := `SELECT
	bankaccounts.id,
	bankaccounts.bankid,
	banks.name AS bank,
	bankaccounts.userid,
	CONCAT(users.FirstName, ' ', users.LastName) AS username,
	bankaccounttypes.id AS bank_account_type_id,
	bankaccounttypes.name AS bank_account_type,
	bankaccountstatuses.id AS status_id,
	bankaccountstatuses.name AS status
	FROM bankaccounts
	INNER JOIN banks ON bankaccounts.bankid = banks.id
	INNER JOIN users ON bankaccounts.userid = users.id
	INNER JOIN bankaccounttypes ON bankaccounts.bankaccounttypeid = bankaccounttypes.id
	INNER JOIN bankaccountstatuses ON bankaccounts.statusid = bankaccountstatuses.id
	WHERE 1=1
	`

	// Query the database
	var rows *sql.Rows
	var err error
	if userID != "" {
		sqlQuery += " AND bankaccounts.userid = '" + userID + "'"
	}

	rows, err = db.Query(sqlQuery)
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

		var bankAccountID sql.NullString
		var bankID sql.NullString
		var bank sql.NullString
		var userID sql.NullString
		var username sql.NullString
		var bankAccountTypeID sql.NullInt64
		var bankAccountType sql.NullString
		var statusID sql.NullInt64
		var status sql.NullString

		// Scan the row into the bank account
		err := rows.Scan(&bankAccountID, &bankID, &bank, &userID, &username, &bankAccountTypeID, &bankAccountType, &statusID, &status)
		if err != nil {
			panic(err)
		}

		// Set the bank account fields
		bankAccount.ID = bankAccountID.String
		bankAccount.BankID = bankID.String
		bankAccount.Bank = bank.String
		bankAccount.UserID = userID.String
		bankAccount.Username = username.String
		bankAccount.BankAccountTypeID = int(bankAccountTypeID.Int64)
		bankAccount.BankAccountType = bankAccountType.String
		bankAccount.StatusID = int(statusID.Int64)
		bankAccount.Status = status.String

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

	sqlQuery := `SELECT
	users.id,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber
	FROM users
	WHERE 1=1
	`

	// Query the database
	var rows *sql.Rows
	var err error
	if userID != "" {
		sqlQuery += " AND users.id = '" + userID + "'"
	}

	rows, err = db.Query(sqlQuery)
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

	sqlQuery := `SELECT
	messages.id,
	messages.userid,
	CONCAT(users.FirstName, ' ', users.LastName) AS username,
	messages.content
	FROM messages
	INNER JOIN users ON messages.userid = users.id`

	// Query the database
	var rows *sql.Rows
	var err error
	if userID != "" {
		sqlQuery += " WHERE messages.userid = '" + userID + "'"
	}

	rows, err = db.Query(sqlQuery)
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
		var username sql.NullString
		var content sql.NullString

		// Scan the row into the message
		err := rows.Scan(&messageID, &userID, &username, &content)
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
