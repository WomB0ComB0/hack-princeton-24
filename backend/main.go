package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/databricks/databricks-sql-go"
)

func main() {
	// Load the env
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	// Get the DSN from the env
	dsn := os.Getenv("DATABRICKS_DSN")

	fmt.Println("Opening connection...")

	db, err := sql.Open("databricks", dsn)
	if err != nil {
		panic(err)
	}

	rows, err := db.QueryContext(context.Background(), "SELECT * FROM test_table")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		// id and descritpion are the columns in the table
		var id sql.NullInt64
		var description sql.NullString

		rows.Scan(&id, &description)

		fmt.Printf("id: %d, description: %s\n", id.Int64, description.String)
	}
}
