package entities

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/wenzhongchi/contactly/backend/src/config"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID              ID     `gorm:"primary_key;type:uuid;"`
	Phone           string `gorm:"size:100;not null;unique;"`
	Email           string `gorm:"size:100;unique;"`
	Password        string `gorm:"size:100;not null;"`
	FirstName       string
	LastName        string
	ImageUrl        string
	Role            string
	IsPhoneVerified bool
	IsEmailVerified bool
	IsActive        bool
	IsReported      bool
	IsBlocked       bool
	TrackingID      string
	CreatedAt       time.Time
	UpdatedAt       time.Time
	DeletedAt       *time.Time
}

func NewUser(phone string, password string) (*User, error) {
	u := &User{
		ID:    NewUUID(),
		Phone: phone,
	}

	pwd, err := generatePassword(password)
	if err != nil {
		return nil, err
	}

	u.Password = pwd
	err = u.Validate()
	if err != nil {
		return nil, config.ErrInvalidEntity
	}

	return u, nil
}

func generatePassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func (u *User) ValidatePassword(hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(u.Password))
	if err != nil {
		return err
	}
	return nil
}

func (u *User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Phone, validation.Required),
		validation.Field(&u.Password, validation.Required))
}

func (u *User) GetID() string {
	return u.ID.String()
}
