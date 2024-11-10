package models

type SecurityAssets struct {
	ID           int           `json:"id"`
	BankAccount  BankAccount   `json:"bank_account"`
	Symbol       string        `json:"symbol"`
	Quantity     float64       `json:"quantity"`
	SecurityType SecurityTypes `json:"security_type"`
}

type SecurityTypes struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
