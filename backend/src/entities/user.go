package entities

import (
	"time"

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

func CreateUser(phone string, password string, firstName string, lastName string) (*User, error) {
	u := &User{
		ID:        UUID(),
		Phone:     phone,
		FirstName: firstName,
		LastName:  lastName,
	}

	pwd, err := generatePassword(password)
	if err != nil {
		return nil, err
	}

	u.Password = pwd
	err = u.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
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
	if u.Phone == "" || u.FirstName == "" || u.LastName == "" || u.Password == "" {
		return ErrInvalidEntity
	}

	return nil
}

func (u *User) GetID() string {
	return u.ID.String()
}
