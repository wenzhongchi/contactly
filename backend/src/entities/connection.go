package entities

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/wenzhongchi/contactly/backend/src/config"
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

func NewConnection(connectionID string, userID ID) (*Connection, error) {
	c := &Connection{
		ID:           NewUUID(),
		ConnectionID: connectionID,
		UserID:       userID,
	}

	err := c.Validate()
	if err != nil {
		return nil, config.ErrInvalidEntity
	}
	return c, nil
}

func (c *Connection) Validate() error {
	return validation.ValidateStruct(&c,
		validation.Field(&c.ConnectionID, validation.Required),
		validation.Field(&c.UserID, validation.Required))
}
