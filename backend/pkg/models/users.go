package models

type User struct {
	ID          string `json:"id"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Birthdate   string `json:"birthdate"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
}

type Message struct {
	ID      int    `json:"id"`
	UserID  string `json:"user_id"`
	Content string `json:"content"`
}

