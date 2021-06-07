package entities

import (
	"time"
)

type UserVerification struct {
	ID        ID     `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Code      string `gorm:"size:45;not null;unique;"`
	Type      string
	UserID    ID
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
