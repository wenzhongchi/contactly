package constants

import "time"


const (
AccessTokenExpiresIn  = 30 * 24 * time.Hour  // one month
	RefreshTokenExpiresIn = 365 * 24 * time.Hour // one year
	ResetTokenExpiresIn   = 5 * time.Minute

)
 