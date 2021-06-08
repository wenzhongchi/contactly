package config

import "time"

const (
	AccessTokenExpiresIn  = 7 * 24 * time.Hour  // one week
	RefreshTokenExpiresIn = 30 * 24 * time.Hour // one month
	ResetTokenExpiresIn   = 5 * time.Minute     // five mins

	MinSecretKeySize = 32
)
