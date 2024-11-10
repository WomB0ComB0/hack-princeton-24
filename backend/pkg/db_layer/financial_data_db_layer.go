package db_layer

import (
	"database/sql"
	"hackprinceton/pkg/models"
)

// Extract Transaction data from the database for a given user and transaction
// If the user ID is empty, return all transactions
// If only the user ID is provided, return all transactions for that user
func GetTransactions(args map[string]interface{}) []models.Transaction {
	// Connect to the database
	db := ConnectToDB()

	sqlQuery := `SELECT
	transactions.id,
	transactions.userid,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber,
	transactiontypes.id AS transactiontypeid,
	transactiontypes.name AS transactiontype,
	transactioncategories.id AS transactioncategoryid,
	transactioncategories.name AS transactioncategory,
	currencies.id AS currencyid,
	currencies.symbol AS currency,
	transactions.amount,
	transactions.datetime
	FROM transactions
	INNER JOIN users ON transactions.userid = users.id
	INNER JOIN transactiontypes ON transactions.transactiontypeid = transactiontypes.id
	INNER JOIN transactioncategories ON transactions.transactioncategoryid = transactioncategories.id
	INNER JOIN currencies ON transactions.currencyid = currencies.id;
	`

	// Query the database
	var rows *sql.Rows
	var err error
	rows, err = db.Query(sqlQuery)
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
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString
		var email sql.NullString
		var phoneNumber sql.NullString
		var transactionTypeID sql.NullInt64
		var transactionType sql.NullString
		var transactionCategoryID sql.NullInt64
		var transactionCategory sql.NullString
		var currencyID sql.NullInt64
		var currency sql.NullString
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the transaction
		err := rows.Scan(&transactionID, &userID, &firstName, &lastName, &birthdate, &email, &phoneNumber, &transactionTypeID, &transactionType, &transactionCategoryID, &transactionCategory, &currencyID, &currency, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the transaction fields
		transaction.ID = transactionID.String
		transaction.User.ID = userID.String
		transaction.User.FirstName = firstName.String
		transaction.User.LastName = lastName.String
		transaction.User.Birthdate = birthdate.String
		transaction.User.Email = email.String
		transaction.User.PhoneNumber = phoneNumber.String
		transaction.TransactionType.ID = int(transactionTypeID.Int64)
		transaction.TransactionType.Name = transactionType.String
		transaction.TransactionCategory.ID = int(transactionCategoryID.Int64)
		transaction.TransactionCategory.Name = transactionCategory.String
		transaction.Currency.ID = int(currencyID.Int64)
		transaction.Currency.Symbol = currency.String
		transaction.Currency.Description = currency.String
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
func GetAccountBalances(args map[string]interface{}) []models.AccountBalance {
	// Connect to the database
	db := ConnectToDB()

	sqlQuery := `SELECT
	accountbalances.id,
	accountbalances.bankaccountid,
	users.id AS userid,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber,
	banks.id AS bankid,
	banks.name AS bank,
	bankaccounttypes.id AS bankaccounttypeid,
	bankaccounttypes.name AS bankaccounttype,
	bankaccountstatuses.id AS statusid,
	bankaccountstatuses.name AS status,
	currencies.id AS currencyid,
	currencies.symbol AS currency,
	accountbalances.amount,
	accountbalances.datetime
	FROM accountbalances
	INNER JOIN bankaccounts ON accountbalances.bankaccountid = bankaccounts.id
	INNER JOIN users ON bankaccounts.userid = users.id
	INNER JOIN banks ON bankaccounts.bankid = banks.id
	INNER JOIN bankaccounttypes ON bankaccounts.bankaccounttypeid = bankaccounttypes.id
	INNER JOIN bankaccountstatuses ON bankaccounts.statusid = bankaccountstatuses.id
	INNER JOIN currencies ON accountbalances.currencyid = currencies.id
	`

	// Query the database
	var rows *sql.Rows
	var err error
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
		var userID sql.NullString
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString
		var email sql.NullString
		var phoneNumber sql.NullString
		var bankID sql.NullString
		var bank sql.NullString
		var bankAccountTypeID sql.NullInt64
		var bankAccountType sql.NullString
		var statusID sql.NullInt64
		var status sql.NullString
		var currencyID sql.NullInt64
		var currency sql.NullString
		var amount sql.NullFloat64
		var dateTime sql.NullString

		// Scan the row into the account balance
		err := rows.Scan(&accountBalanceID, &bankAccountID, &userID, &firstName, &lastName, &birthdate, &email, &phoneNumber, &bankID, &bank, &bankAccountTypeID, &bankAccountType, &statusID, &status, &currencyID, &currency, &amount, &dateTime)
		if err != nil {
			panic(err)
		}

		// Set the account balance fields
		accountBalance.ID = int(accountBalanceID.Int64)
		accountBalance.BankAccount.ID = bankAccountID.String
		accountBalance.BankAccount.User.ID = userID.String
		accountBalance.BankAccount.User.FirstName = firstName.String
		accountBalance.BankAccount.User.LastName = lastName.String
		accountBalance.BankAccount.User.Birthdate = birthdate.String
		accountBalance.BankAccount.User.Email = email.String
		accountBalance.BankAccount.User.PhoneNumber = phoneNumber.String
		accountBalance.BankAccount.Bank.ID = bankID.String
		accountBalance.BankAccount.Bank.Name = bank.String
		accountBalance.BankAccount.BankAccountType.ID = int(bankAccountTypeID.Int64)
		accountBalance.BankAccount.BankAccountType.Name = bankAccountType.String
		accountBalance.BankAccount.BankAccountStatus.ID = int(statusID.Int64)
		accountBalance.BankAccount.BankAccountStatus.Name = status.String
		accountBalance.Currency.ID = int(currencyID.Int64)
		accountBalance.Currency.Symbol = currency.String
		accountBalance.Amount = amount.Float64
		accountBalance.DateTime = dateTime.String

		// Append the account balance to the slice
		accountBalances = append(accountBalances, accountBalance)
	}

	return accountBalances
}

// Extract BankAccount data from the database for a given bank user
// If the user ID is empty, return all bank accounts
func GetBankAccounts(args map[string]interface{}) []models.BankAccount {
	// Connect to the database
	db := ConnectToDB()
	sqlQuery := `SELECT
	bankaccounts.id,
	bankaccounts.bankid,
	banks.name AS bank,
	bankaccounts.userid,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber,
	bankaccounttypes.id AS bankaccounttypeid,
	bankaccounttypes.name AS bankaccounttype,
	bankaccountstatuses.id AS statusid,
	bankaccountstatuses.name AS status
	FROM bankaccounts
	INNER JOIN banks ON bankaccounts.bankid = banks.id
	INNER JOIN users ON bankaccounts.userid = users.id
	INNER JOIN bankaccounttypes ON bankaccounts.bankaccounttypeid = bankaccounttypes.id`

	// Query the database
	var rows *sql.Rows
	var err error
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
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString
		var email sql.NullString
		var phoneNumber sql.NullString
		var bankAccountTypeID sql.NullInt64
		var bankAccountType sql.NullString
		var statusID sql.NullInt64
		var status sql.NullString

		// Scan the row into the bank account
		err := rows.Scan(&bankAccountID, &bankID, &bank, &userID, &firstName, &lastName, &birthdate, &email, &phoneNumber, &bankAccountTypeID, &bankAccountType, &statusID, &status)
		if err != nil {
			panic(err)
		}

		// Set the bank account fields
		bankAccount.ID = bankAccountID.String
		bankAccount.Bank.ID = bankID.String
		bankAccount.Bank.Name = bank.String
		bankAccount.User.ID = userID.String
		bankAccount.User.FirstName = firstName.String
		bankAccount.User.LastName = lastName.String
		bankAccount.User.Birthdate = birthdate.String
		bankAccount.User.Email = email.String
		bankAccount.User.PhoneNumber = phoneNumber.String
		bankAccount.BankAccountType.ID = int(bankAccountTypeID.Int64)
		bankAccount.BankAccountType.Name = bankAccountType.String
		bankAccount.BankAccountStatus.ID = int(statusID.Int64)
		bankAccount.BankAccountStatus.Name = status.String

		// Append the bank account to the slice
		bankAccounts = append(bankAccounts, bankAccount)
	}

	return bankAccounts
}

// Extract Users data from the database for a given user
// If the user ID is empty, return all users
func GetUsers(args map[string]interface{}) []models.User {
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
func GetMessages(args map[string]interface{}) []models.Message {
	// Connect to the database
	db := ConnectToDB()

	sqlQuery := `SELECT
	messages.id,
	messages.userid,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber,
	messages.content
	FROM messages
	INNER JOIN users ON messages.userid = users.id`

	// Query the database
	var rows *sql.Rows
	var err error
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
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString
		var email sql.NullString
		var phoneNumber sql.NullString
		var content sql.NullString

		// Scan the row into the message
		err := rows.Scan(&messageID, &userID, &firstName, &lastName, &birthdate, &email, &phoneNumber, &content)
		if err != nil {
			panic(err)
		}

		// Set the message fields
		message.ID = int(messageID.Int64)
		message.User.ID = userID.String
		message.User.FirstName = firstName.String
		message.User.LastName = lastName.String
		message.User.Birthdate = birthdate.String
		message.User.Email = email.String
		message.User.PhoneNumber = phoneNumber.String
		message.Content = content.String

		// Append the message to the slice
		messages = append(messages, message)
	}

	return messages
}

// Extract Security Asset data from the database
func GetSecurityAssets(args map[string]interface{}) []models.SecurityAssets {
	// Connect to the database
	db := ConnectToDB()

	sqlQuery := `SELECT
	securityassets.id,
	bankaccounts.id,
	banks.id,
	banks.name,
	users.id,
	users.FirstName,
	users.LastName,
	users.Birthdate,
	users.Email,
	users.PhoneNumber,
	bankaccounttypes.id,
	bankaccounttypes.name,
	bankaccountstatuses.id,
	bankaccountstatuses.name,
	securityassets.symbol,
	securityassets.quantity,
	securitytypes.id,
	securitytypes.name
	FROM securityassets
	INNER JOIN bankaccounts ON securityassets.bankaccountid = bankaccounts.id
	INNER JOIN banks ON bankaccounts.bankid = banks.id
	INNER JOIN users ON bankaccounts.userid = users.id
	INNER JOIN bankaccounttypes ON bankaccounts.bankaccounttypeid = bankaccounttypes.id
	INNER JOIN bankaccountstatuses ON bankaccounts.statusid = bankaccountstatuses.id
	INNER JOIN securitytypes ON securityassets.securitytypeid = securitytypes.id
	`

	// Query the database
	var rows *sql.Rows
	var err error
	rows, err = db.Query(sqlQuery)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Create a slice to hold the security assets
	securityAssets := []models.SecurityAssets{}

	// Iterate over the rows
	for rows.Next() {
		// Create a new security asset
		securityAsset := models.SecurityAssets{}

		var securityAssetID sql.NullInt64
		var bankAccountID sql.NullString
		var bankID sql.NullString
		var bankName sql.NullString
		var userID sql.NullString
		var firstName sql.NullString
		var lastName sql.NullString
		var birthdate sql.NullString
		var email sql.NullString
		var phoneNumber sql.NullString
		var bankAccountTypeID sql.NullInt64
		var bankAccountType sql.NullString
		var statusID sql.NullInt64
		var status sql.NullString
		var symbol sql.NullString
		var quantity sql.NullFloat64
		var securityTypeID sql.NullInt64
		var securityTypeName sql.NullString

		// Scan the row into the security asset
		err := rows.Scan(&securityAssetID, &bankAccountID, &bankID, &bankName, &userID, &firstName, &lastName, &birthdate, &email, &phoneNumber, &bankAccountTypeID, &bankAccountType, &statusID, &status, &symbol, &quantity, &securityTypeID, &securityTypeName)
		if err != nil {
			panic(err)
		}

		// Set the security asset fields
		securityAsset.ID = int(securityAssetID.Int64)
		securityAsset.BankAccount.ID = bankAccountID.String
		securityAsset.BankAccount.Bank.ID = bankID.String
		securityAsset.BankAccount.Bank.Name = bankName.String
		securityAsset.BankAccount.User.ID = userID.String
		securityAsset.BankAccount.User.FirstName = firstName.String
		securityAsset.BankAccount.User.LastName = lastName.String
		securityAsset.BankAccount.User.Birthdate = birthdate.String
		securityAsset.BankAccount.User.Email = email.String
		securityAsset.BankAccount.User.PhoneNumber = phoneNumber.String
		securityAsset.BankAccount.BankAccountType.ID = int(bankAccountTypeID.Int64)
		securityAsset.BankAccount.BankAccountType.Name = bankAccountType.String
		securityAsset.BankAccount.BankAccountStatus.ID = int(statusID.Int64)
		securityAsset.BankAccount.BankAccountStatus.Name = status.String
		securityAsset.Symbol = symbol.String
		securityAsset.Quantity = quantity.Float64
		securityAsset.SecurityType.ID = int(securityTypeID.Int64)
		securityAsset.SecurityType.Name = securityTypeName.String

		// Append the security asset to the slice
		securityAssets = append(securityAssets, securityAsset)
	}

	return securityAssets
}
