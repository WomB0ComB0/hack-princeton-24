package main

import (
	"fmt"
	"hackprinceton/pkg/db_layer"
	graphqllayer "hackprinceton/pkg/graphql"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
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

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: graphqllayer.QueryType,
	})

	if err != nil {
		panic(err)
	}

	// Create a new GraphQL handler
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	http.Handle("/graphql", h)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", nil)
}
