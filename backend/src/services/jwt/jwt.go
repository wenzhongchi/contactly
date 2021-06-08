package jwt

import (
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/wenzhongchi/contactly/backend/src/config"
	"github.com/wenzhongchi/contactly/backend/src/libs/logger"
	"go.uber.org/zap"
)

type JwtGenerator interface {
	GenerateTokenWithKey(userID string, duration time.Duration) (string, error)
	ValidateTokenWithKey(token string) (*Payload, error)
	GenerateTokenWithSecret(userID string, duration time.Duration) (string, error)
	ValidateTokenWithSecret(token string) (*Payload, error)
}

type JwtService struct {
	privateKey string
	publicKey  string
	secretKey  string
}

func NewJwtGenerator(privateKey, publicKey, secretKey string) JwtGenerator {
	return &JwtService{privateKey, publicKey, secretKey}
}

func (j *JwtService) GenerateTokenWithKey(userID string, duration time.Duration) (string, error) {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	privateKey := []byte(strings.Replace(j.privateKey, `\n`, "\n", -1))
	signKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	if err != nil {
		logger.Instance.Error("fail to read private key", zap.Error(err))
		return "", err
	}

	payload, err := NewPayload(userID, duration)
	if err != nil {
		logger.Instance.Error("fail to create payload", zap.Error(err))
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, payload)
	tokenString, err := token.SignedString(signKey)
	if err != nil {
		logger.Instance.Error("fail to sign token", zap.Error(err))
		return "", err
	}

	return tokenString, nil
}

func (j *JwtService) ValidateTokenWithKey(token string) (*Payload, error) {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	publicKey := []byte(strings.Replace(j.publicKey, `\n`, "\n", -1))
	verifyKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		logger.Instance.Error("fail to read public key", zap.Error(err))
		return nil, err
	}

	payload := &Payload{}
	jwtToken, err := jwt.ParseWithClaims(token, payload, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})
	if err != nil {
		logger.Instance.Error("fail to parse payload", zap.Error(err))
		return nil, err
	}

	if !jwtToken.Valid {
		logger.Instance.Error("token invalid", zap.Error(err))
		return nil, config.ErrExpiredToken
	}

	return payload, nil
}

func (j *JwtService) GenerateTokenWithSecret(userID string, duration time.Duration) (string, error) {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	if len(j.secretKey) != config.MinSecretKeySize {
		logger.Instance.Error("secret key is not valid")
		return "", config.ErrInvalidSecretKey
	}

	payload, err := NewPayload(userID, duration)
	if err != nil {
		logger.Instance.Error("fail to create payload", zap.Error(err))
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenString, err := token.SignedString([]byte(j.secretKey))
	if err != nil {
		logger.Instance.Error("fail to sign token", zap.Error(err))
		return "", err
	}

	return tokenString, nil
}

func (j *JwtService) ValidateTokenWithSecret(token string) (*Payload, error) {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	if len(j.secretKey) != config.MinSecretKeySize {
		logger.Instance.Error("secret key is not valid")
		return nil, config.ErrInvalidSecretKey
	}

	payload := &Payload{}
	jwtToken, err := jwt.ParseWithClaims(token, payload, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.secretKey), nil
	})
	if err != nil {
		logger.Instance.Error("fail to parse payload", zap.Error(err))
		return nil, err
	}

	if !jwtToken.Valid {
		logger.Instance.Error("token invalid", zap.Error(err))
		return nil, config.ErrExpiredToken
	}

	return payload, nil
}
