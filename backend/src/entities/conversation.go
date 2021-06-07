package entities

import (
	"time"
)

type Conversation struct {
	ID        ID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	UserID    ID
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
