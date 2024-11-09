package models

type Transaction struct {
	ID                int     `json:"id"`
	UserID            string  `json:"user_id"`
	TransactionTypeID int     `json:"transaction_type_id"`
	CurrencyID        int     `json:"currency_id"`
	Amount            float64 `json:"amount"`
	DateTime          string  `json:"date_time"`
}

type AccountBalance struct {
	ID            int     `json:"id"`
	BankAccountID int     `json:"bank_account_id"`
	CurrencyID    int     `json:"currency_id"`
	Amount        float64 `json:"amount"`
	DateTime      string  `json:"date_time"`
}

type BankAccount struct {
	ID                int    `json:"id"`
	BankID            int    `json:"bank_id"`
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

type Bank struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	RoutingNumber string `json:"routing_number"`
}

type User struct {
	ID        string `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Birthdate string `json:"birthdate"`
}

type UserPhoneNumber struct {
	ID          int    `json:"id"`
	UserID      int    `json:"user_id"`
	PhoneNumber string `json:"phone_number"`
}

type Message struct {
	ID      int    `json:"id"`
	UserID  int    `json:"user_id"`
	Content string `json:"content"`
}

type TransactionType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Currency struct {
	ID          int    `json:"id"`
	Symbol      string `json:"symbol"`
	Description string `json:"description"`
}

type TransactionStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
