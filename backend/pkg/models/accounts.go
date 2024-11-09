package models

type AccountBalance struct {
	ID            int     `json:"id"`
	BankAccountID string  `json:"bank_account_id"`
	CurrencyID    int     `json:"currency_id"`
	Amount        float64 `json:"amount"`
	DateTime      string  `json:"date_time"`
}

type BankAccount struct {
	ID                string `json:"id"`
	BankID            string `json:"bank_id"`
	UserID            string `json:"user_id"`
	BankAccountTypeID int    `json:"bank_account_type_id"`
	StatusID          int    `json:"status_id"`
	AccountNumber     string `json:"account_number"`
	RoutingNumber     string `json:"routing_number"`
}

type BankAccountType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type BankAccountStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
