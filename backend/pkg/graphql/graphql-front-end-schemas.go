package graphqllayer

import (
	"hackprinceton/pkg/db_layer"

	"github.com/graphql-go/graphql"
)

var accountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Account",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"userID": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var balanceType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Balance",
	Fields: graphql.Fields{
		"bankAccountID": &graphql.Field{
			Type: graphql.Int,
		},
		"amount": &graphql.Field{
			Type: graphql.Float,
		},
	},
})

var transactionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Transaction",
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
		"transactionType": &graphql.Field{
			Type: graphql.String,
		},
		"transactionTypeID": &graphql.Field{
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

var QueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"accounts": &graphql.Field{
			Type: graphql.NewList(accountType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return db_layer.GetBankAccounts(""), nil
			},
		},
		"balances": &graphql.Field{
			Type: graphql.NewList(balanceType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return db_layer.GetAccountBalances("", ""), nil
			},
		},
		"transactions": &graphql.Field{
			Type: graphql.NewList(transactionType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return db_layer.GetTransactions("", ""), nil
			},
		},
	},
})
