package jwt

import (
	"time"

	"github.com/google/uuid"
	"github.com/wenzhongchi/contactly/backend/src/config"
)

type Payload struct {
	UID       string    `json:"uid"`
	UserID    string    `json:"user_id"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

func NewPayload(userID string, duration time.Duration) (*Payload, error) {
	UID := uuid.New().String()

	payload := &Payload{
		UID:       UID,
		UserID:    userID,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}
	return payload, nil
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return config.ErrExpiredToken
	}
	return nil
}
