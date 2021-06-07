package entities

import (
	"time"

	"github.com/google/uuid"
)

type Connection struct {
	ID           ID `gorm:"primary_key;type:uuid;"`
	ConnectionID string
	UserID       ID
	User         User
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time
}

func CreateConnection(connectionID string, userID ID) (*Connection, error) {
	c := &Connection{
		ID:           UUID(),
		ConnectionID: connectionID,
		UserID:       userID,
	}

	err := c.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
	}
	return c, nil
}

func (c *Connection) Validate() error {
	if c.ConnectionID == "" || c.UserID == uuid.Nil {
		return ErrInvalidEntity
	}
	return nil
}
