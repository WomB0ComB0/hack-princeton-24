package graphqllayer

import (
	"hackprinceton/pkg/db_layer"

	"github.com/graphql-go/graphql"
)

var accountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Account",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"userID": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"bankAccountTypeID": &graphql.Field{
			Type: graphql.Int,
		},
		"bankAccountType": &graphql.Field{
			Type: graphql.String,
		},
		"statusID": &graphql.Field{
			Type: graphql.Int,
		},
		"status": &graphql.Field{
			Type: graphql.String,
		},
		"bankID": &graphql.Field{
			Type: graphql.String,
		},
		"bank": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var balanceType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Balance",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"bankAccountID": &graphql.Field{
			Type: graphql.String,
		},
		"bankID": &graphql.Field{
			Type: graphql.String,
		},
		"bank": &graphql.Field{
			Type: graphql.String,
		},
		"currencyID": &graphql.Field{
			Type: graphql.Int,
		},
		"currency": &graphql.Field{
			Type: graphql.String,
		},
		"amount": &graphql.Field{
			Type: graphql.Float,
		},
		"dateTime": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var transactionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Transaction",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"userID": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"transactionType": &graphql.Field{
			Type: graphql.String,
		},
		"transactionTypeID": &graphql.Field{
			Type: graphql.Int,
		},
		"category": &graphql.Field{
			Type: graphql.String,
		},
		"categoryID": &graphql.Field{
			Type: graphql.Int,
		},
		"currency": &graphql.Field{
			Type: graphql.String,
		},
		"currencyID": &graphql.Field{
			Type: graphql.Int,
		},
		"amount": &graphql.Field{
			Type: graphql.Float,
		},
		"dateTime": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var messageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Message",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"userID": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var userType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"firstName": &graphql.Field{
			Type: graphql.String,
		},
		"lastName": &graphql.Field{
			Type: graphql.String,
		},
		"birthdate": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"phoneNumber": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var QueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"accounts": &graphql.Field{
			Type: graphql.NewList(accountType),
			Args: graphql.FieldConfigArgument{
				"userID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var userID string

				if p.Args["userID"] != nil {
					userID = p.Args["userID"].(string)
				} else {
					userID = ""
				}

				return db_layer.GetBankAccounts(userID), nil
			},
		},
		"balances": &graphql.Field{
			Type: graphql.NewList(balanceType),
			Args: graphql.FieldConfigArgument{
				"userID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"transactionID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var userID string
				var transactionID string

				if p.Args["userID"] != nil {
					userID = p.Args["userID"].(string)
				} else {
					userID = ""
				}

				if p.Args["transactionID"] != nil {
					transactionID = p.Args["transactionID"].(string)
				} else {
					transactionID = ""
				}

				return db_layer.GetAccountBalances(userID, transactionID), nil
			},
		},
		"transactions": &graphql.Field{
			Type: graphql.NewList(transactionType),
			Args: graphql.FieldConfigArgument{
				"userID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"transactionID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var userID string
				var transactionID string

				if p.Args["userID"] != nil {
					userID = p.Args["userID"].(string)
				} else {
					userID = ""
				}

				if p.Args["transactionID"] != nil {
					transactionID = p.Args["transactionID"].(string)
				} else {
					transactionID = ""
				}

				return db_layer.GetTransactions(userID, transactionID), nil
			},
		},
		"messages": &graphql.Field{
			Type: graphql.NewList(messageType),
			Args: graphql.FieldConfigArgument{
				"userID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var userID string

				if p.Args["userID"] != nil {
					userID = p.Args["userID"].(string)
				} else {
					userID = ""
				}

				return db_layer.GetMessages(userID), nil
			},
		},
		"users": &graphql.Field{
			Type: graphql.NewList(userType),
			Args: graphql.FieldConfigArgument{
				"userID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var userID string

				if p.Args["userID"] != nil {
					userID = p.Args["userID"].(string)
				} else {
					userID = ""
				}

				return db_layer.GetUsers(userID), nil
			},
		},
	},
})
