package models

type Transaction struct {
	ID                string  `json:"id"`
	UserID            string  `json:"user_id"`
	Username          string  `json:"username"`
	TransactionTypeID int     `json:"transaction_type_id"`
	TransactionType   string  `json:"transaction_type"`
	CurrencyID        int     `json:"currency_id"`
	Currency          string  `json:"currency"`
	Amount            float64 `json:"amount"`
	DateTime          string  `json:"date_time"`
}

type TransactionStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type TransactionType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
