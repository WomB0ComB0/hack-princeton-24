package models

type AccountBalance struct {
	ID          int         `json:"id"`
	BankAccount BankAccount `json:"bank_account"`
	Currency    Currency    `json:"currency"`
	Amount      float64     `json:"amount"`
	DateTime    string      `json:"date_time"`
}

type BankAccount struct {
	ID                string            `json:"id"`
	User              User              `json:"user"`
	Bank              Bank              `json:"bank"`
	BankAccountType   BankAccountType   `json:"bank_account_type"`
	BankAccountStatus BankAccountStatus `json:"bank_account_status"`
}

type BankAccountType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type BankAccountStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
