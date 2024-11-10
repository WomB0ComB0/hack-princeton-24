package main

import (
	"fmt"
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
