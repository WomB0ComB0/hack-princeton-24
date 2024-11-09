package dblayer

import (
	"database/sql"
	"os"
)

func ConnectToDB() *sql.DB {
	dns := os.Getenv("DB_DSN")
	driver := os.Getenv("DB_DRIVER")

	db, err := sql.Open(driver, dns)
	if err != nil {
		panic(err)
	}

	return db
}
