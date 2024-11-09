package db_layer

import (
	"database/sql"
	"os"
)

func ConnectToDB() *sql.DB {
	dns := os.Getenv("DB_DSN")
	driver := os.Getenv("DB_DRIVER")
	schema := os.Getenv("DB_SCHEMA")

	db, err := sql.Open(driver, dns)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("USE " + schema)
	if err != nil {
		panic(err)
	}

	return db
}
