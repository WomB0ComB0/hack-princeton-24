package models

type Currency struct {
	ID          int    `json:"id"`
	Symbol      string `json:"symbol"`
	Description string `json:"description"`
}
