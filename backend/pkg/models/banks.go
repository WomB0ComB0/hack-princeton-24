package models

type Bank struct {
	ID            string `json:"id"`
	Name          string `json:"name"`
	RoutingNumber string `json:"routing_number"`
}
