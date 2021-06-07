package entities

import (
	"time"
)

type Message struct {
	ID             ID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	ConversationID ID
	Conversation   Conversation
	UserID         ID
	User           User
	Type           string
	Message        string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      *time.Time
}
