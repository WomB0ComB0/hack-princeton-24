package models

type Transaction struct {
	ID                  string              `json:"id"`
	User                User                `json:"user"`
	TransactionStatus   TransactionStatus   `json:"transaction_status"`
	TransactionType     TransactionType     `json:"transaction_type"`
	TransactionCategory TransactionCategory `json:"transaction_category"`
	Currency            Currency            `json:"currency"`
	Amount              float64             `json:"amount"`
	DateTime            string              `json:"date_time"`
}

type TransactionStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type TransactionType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type TransactionCategory struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
