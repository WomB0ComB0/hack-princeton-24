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
		"user": &graphql.Field{
			Type: userType,
		},
		"bank": &graphql.Field{
			Type: bankType,
		},
		"bankAccountType": &graphql.Field{
			Type: bankAccountTypeType,
		},
		"bankAccountStatus": &graphql.Field{
			Type: bankAccountStatusType,
		},
	},
})

var bankAccountTypeType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BankAccountType",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var bankAccountStatusType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BankAccountStatus",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
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
		"user": &graphql.Field{
			Type: userType,
		},
		"transactionStatus": &graphql.Field{
			Type: transactionStatusType,
		},
		"transactionType": &graphql.Field{
			Type: transactionTypeType,
		},
		"transactionCategory": &graphql.Field{
			Type: transactionCategoryType,
		},
		"amount": &graphql.Field{
			Type: graphql.Float,
		},
		"dateTime": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var transactionStatusType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TransactionStatus",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var transactionTypeType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TransactionType",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var transactionCategoryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TransactionCategory",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var securitiesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SecurityAssets",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"bankAccount": &graphql.Field{
			Type: accountType,
		},
		"symbol": &graphql.Field{
			Type: graphql.String,
		},
		"quantity": &graphql.Field{
			Type: graphql.Float,
		},
		"securityType": &graphql.Field{
			Type: securityTypesType,
		},
	},
})

var securityTypesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SecurityTypes",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var balanceType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Balance",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"bankAccount": &graphql.Field{
			Type: accountType,
		},
		"currency": &graphql.Field{
			Type: currencyType,
		},
		"amount": &graphql.Field{
			Type: graphql.Float,
		},
		"dateTime": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var bankType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Bank",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var currencyType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Currency",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"symbol": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
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

var messageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Message",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"user": &graphql.Field{
			Type: userType,
		},
		"content": &graphql.Field{
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
				return db_layer.GetBankAccounts(p.Args), nil
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
				"bankAccountID": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"bank": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"currency": &graphql.ArgumentConfig{
					Type: graphql.Int,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return db_layer.GetAccountBalances(p.Args), nil
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
				return db_layer.GetTransactions(p.Args), nil
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
				return db_layer.GetMessages(p.Args), nil
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
				return db_layer.GetUsers(p.Args), nil
			},
		},
	},
})
