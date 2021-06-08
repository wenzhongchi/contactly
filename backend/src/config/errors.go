package config

import (
	"errors"
	"fmt"
)

var (
	ErrExpiredToken     = errors.New("token has expired")
	ErrNotFound         = errors.New("not found")
	ErrInvalidEntity    = errors.New("invalid entity")
	ErrInvalidSecretKey = fmt.Errorf("invalid key size: must be at least %d characters", MinSecretKeySize)
)
