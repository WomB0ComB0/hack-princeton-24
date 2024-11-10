package models

type AccountBalance struct {
	ID            int     `json:"id"`
	BankAccountID string  `json:"bank_account_id"`
	BankID        string  `json:"bank_id"`
	Bank          string  `json:"bank_name"`
	CurrencyID    int     `json:"currency_id"`
	Currency      string  `json:"currency"`
	Amount        float64 `json:"amount"`
	DateTime      string  `json:"date_time"`
}

type BankAccount struct {
	ID                string `json:"id"`
	BankID            string `json:"bank_id"`
	Bank              string `json:"bank_name"`
	UserID            string `json:"user_id"`
	Username          string `json:"username"`
	BankAccountTypeID int    `json:"bank_account_type_id"`
	BankAccountType   string `json:"bank_account_type"`
	StatusID          int    `json:"status_id"`
	Status            string `json:"status"`
}

type BankAccountType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type BankAccountStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
