package entities

import (
	"time"
)

type BlockList struct {
	ID            ID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	UserID        ID
	User          User
	ParticipantID ID
	Participant   User `gorm:"foreignkey:ParticipantID"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     *time.Time
}
