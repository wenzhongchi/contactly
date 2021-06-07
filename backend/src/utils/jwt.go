package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rsa"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/wenzhongchi/contactly/backend/src/constants"
)

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

// Claims contains token contents
type Claims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	jwt.StandardClaims
}

// GenerateAccessToken used to generate encrypted token
func GenerateAccessToken(userID string, email string, time time.Time) (string, error) {
	key := os.Getenv("AUTH_PRIVATE_KEY")
	privateKey := []byte(strings.Replace(key, `\n`, "\n", -1))

	signKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	if err != nil {
		fmt.Println("error: " + err.Error())
		return "", err
	}

	expirationTime := time.Add(constants.AccessTokenExpiresIn)
	claims := &Claims{
		UserID: userID,
		Email:  email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	tokenString, err := token.SignedString(signKey)

	if err != nil {
		fmt.Println("error: " + err.Error())
		return "", err
	}

	return tokenString, nil
}

// ValidateAccessToken used to validate access token
func ValidateAccessToken(tokenString string) (string, error) {
	key := os.Getenv("AUTH_PUBLIC_KEY")
	publicKey := []byte(strings.Replace(key, `\n`, "\n", -1))

	verifyKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		fmt.Println("error: " + err.Error())
		return "", err
	}

	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})
	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", errors.New("access token expired")
	}

	return claims.UserID, nil
}

// GenerateRefreshToken encrypts plain text string into cipher text string
func GenerateRefreshToken(userID string, email string, time time.Time) (string, error) {
	tokenSecret := os.Getenv("REFRESH_SECRET")
	key := []byte(tokenSecret)

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	blockSize := aes.BlockSize

	millis := fmt.Sprintf("%d", time.UnixNano()/1000000)
	plainText := PKCS7Padding([]byte(userID+"#@!"+email+"#@!"+millis), blockSize)

	if len(plainText)%blockSize != 0 {
		err := fmt.Errorf(`plainText: "%s" has the wrong block size`, plainText)
		return "", err
	}

	cipherText := make([]byte, len(plainText))
	iv := key[:blockSize]

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(cipherText, plainText)

	return base64.StdEncoding.EncodeToString(cipherText), nil
}

// ValidateRefreshToken decrypts cipher text string into plain text string
func ValidateRefreshToken(encrypted string) (string, error) {
	tokenSecret := os.Getenv("REFRESH_SECRET")
	key := []byte(tokenSecret)
	cipherText, _ := base64.StdEncoding.DecodeString(encrypted)

	block, bErr := aes.NewCipher(key)
	if bErr != nil {
		return "", bErr
	}

	blockSize := aes.BlockSize
	iv := key[:blockSize]

	if len(cipherText) < blockSize {
		return "", errors.New("cipherText too short")
	}

	if len(cipherText)%blockSize != 0 {
		return "", errors.New("cipherText is not a multiple of the block size")
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	mode.CryptBlocks(cipherText, cipherText)

	cipherText = PKCS7UnPadding(cipherText)
	cipherSlice := strings.Split(fmt.Sprintf("%s", cipherText), "#@!")

	tm, err := strconv.ParseInt(cipherSlice[2], 10, 64)
	if err != nil {
		return "", err
	}

	issuedAt := time.Unix(tm/int64(1000), 0)
	if issuedAt.Before(time.Now().Add(-constants.RefreshTokenExpiresIn)) {
		return "", errors.New("refresh token expired")
	}

	return cipherSlice[0], nil
}

// PKCS7Padding add padding
func PKCS7Padding(cipherText []byte, blockSize int) []byte {
	padding := blockSize - len(cipherText)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(cipherText, padtext...)
}

// PKCS7UnPadding remove padding
func PKCS7UnPadding(text []byte) []byte {
	length := len(text)
	unpadding := int(text[length-1])
	return text[:(length - unpadding)]
}

// GenerateResetToken encrypts plain text string into cipher text string
func GenerateResetToken(userID string, time time.Time) (string, error) {
	tokenSecret := os.Getenv("RESET_SECRET")
	key := []byte(tokenSecret)

	block, bErr := aes.NewCipher(key)
	if bErr != nil {
		return "", bErr
	}

	blockSize := aes.BlockSize

	millis := fmt.Sprintf("%d", time.UnixNano()/1000000)
	plainText := PKCS7Padding([]byte(userID+"#@!"+millis), blockSize)

	if len(plainText)%blockSize != 0 {
		err := fmt.Errorf(`plainText: "%s" has the wrong block size`, plainText)
		return "", err
	}

	cipherText := make([]byte, len(plainText))
	iv := key[:blockSize]

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(cipherText, plainText)

	return hex.EncodeToString(cipherText), nil
}

// ValidateResetToken decrypts cipher text string into plain text string
func ValidateResetToken(encrypted string) (string, error) {
	tokenSecret := os.Getenv("RESET_SECRET")
	key := []byte(tokenSecret)
	cipherText, _ := hex.DecodeString(encrypted)
	println(encrypted)

	block, bErr := aes.NewCipher(key)
	if bErr != nil {
		return "", bErr
	}

	blockSize := aes.BlockSize
	iv := key[:blockSize]

	if len(cipherText) < blockSize {
		return "", errors.New("cipherText too short")
	}

	if len(cipherText)%blockSize != 0 {
		return "", errors.New("cipherText is not a multiple of the block size")
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	mode.CryptBlocks(cipherText, cipherText)

	cipherText = PKCS7UnPadding(cipherText)
	cipherSlice := strings.Split(fmt.Sprintf("%s", cipherText), "#@!")

	tm, err := strconv.ParseInt(cipherSlice[1], 10, 64)
	if err != nil {
		return "", err
	}

	issuedAt := time.Unix(tm/int64(1000), 0)
	if issuedAt.Before(time.Now().Add(-constants.ResetTokenExpiresIn)) {
		return "", errors.New("reset token expired")
	}

	return cipherSlice[0], nil
}
