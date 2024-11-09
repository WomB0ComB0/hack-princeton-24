package main

import (
	"fmt"
	"hackprinceton/pkg/db_layer"

	"github.com/joho/godotenv"

	_ "github.com/databricks/databricks-sql-go"
)

func main() {
	// Load the env
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	balances := db_layer.GetAccountBalances("", "")
	for _, accountBalance := range balances {
		println(fmt.Sprintf("Account: %d, Balance: %f", accountBalance.BankAccountID, accountBalance.Amount))
	}

	accounts := db_layer.GetBankAccounts("")
	for _, account := range accounts {
		println(fmt.Sprintf("Account: %d, User: %s", account.ID, account.UserID))
	}

	transactions := db_layer.GetTransactions("", "")
	for _, transaction := range transactions {
		println(fmt.Sprintf("Transaction: %d, User: %s", transaction.ID, transaction.UserID))
	}

	messages := db_layer.GetMessages("")
	for _, message := range messages {
		println(fmt.Sprintf("Message: %d, User: %s", message.ID, message.UserID))
	}

	users := db_layer.GetUsers("")
	for _, user := range users {
		println(fmt.Sprintf("User: %s %s", user.FirstName, user.LastName))
	}
}
