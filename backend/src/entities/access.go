package entities

import (
	"time"
)

type Access struct {
	ID        ID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Token     string
	DeviceID  ID
	Device    Device
	UserID    ID
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
