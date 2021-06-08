package jwt

import (
	"encoding/hex"
	"os"
	"time"

	"github.com/wenzhongchi/contactly/backend/src/config"
)

func GenerateAccessToken(userID string) (string, error) {
	privateKey := os.Getenv("AUTH_PRIVATE_KEY")
	publicKey := os.Getenv("AUTH_PUBLIC_KEY")
	jwtGenerator := NewJwtGenerator(privateKey, publicKey, "")
	return jwtGenerator.GenerateTokenWithKey(userID, config.AccessTokenExpiresIn)
}

func ValidateAccessToken(token string) (*Payload, error) {
	privateKey := os.Getenv("AUTH_PRIVATE_KEY")
	publicKey := os.Getenv("AUTH_PUBLIC_KEY")
	jwtGenerator := NewJwtGenerator(privateKey, publicKey, "")
	return jwtGenerator.ValidateTokenWithKey(token)
}

func GenerateRefreshToken(userID string) (string, error) {
	refreshSecret := os.Getenv("REFRESH_SECRET")
	jwtGenerator := NewJwtGenerator("", "", refreshSecret)
	return jwtGenerator.GenerateTokenWithKey(userID, config.RefreshTokenExpiresIn)
}

func ValidateRefreshToken(token string) (*Payload, error) {
	refreshSecret := os.Getenv("REFRESH_SECRET")
	jwtGenerator := NewJwtGenerator("", "", refreshSecret)
	return jwtGenerator.ValidateTokenWithSecret(token)
}

func GenerateResetToken(userID string, time time.Time) (string, error) {
	resetSecret := os.Getenv("RESET_SECRET")
	jwtGenerator := NewJwtGenerator("", "", resetSecret)
	tokenString, err := jwtGenerator.GenerateTokenWithKey(userID, config.RefreshTokenExpiresIn)
	return hex.EncodeToString([]byte(tokenString)), err
}

func ValidateResetToken(token string) (*Payload, error) {
	resetSecret := os.Getenv("RESET_SECRET")
	tokenString, _ := hex.DecodeString(token)
	jwtGenerator := NewJwtGenerator("", "", resetSecret)
	return jwtGenerator.ValidateTokenWithSecret(string(tokenString))
}
