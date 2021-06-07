package entities

import (
	"time"
)

type UserDetail struct {
	ID        ID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Location  string
	UserID    *ID
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
