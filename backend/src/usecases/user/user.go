package usecases

import (
	"github.com/wenzhongchi/contactly/backend/src/entities"
	"github.com/wenzhongchi/contactly/backend/src/repositories"
)

type UserUsecase interface {
	Auth(phone, password string) (entities.User, error)
	Register(phone, password string) (entities.User, error)
	VerifyPhone(phone, code string) (entities.User, error)
}

type UserService struct {
	userRepo repositories.UserRepository
}

func NewUserUsecase(u repositories.UserRepository) *UserService {
	return &UserService{userRepo: u}
}

func (u *UserService) Auth(phone, password string) (entities.User, error) {
	user, err := entities.NewUser(phone, password)
	if err != nil {
		return *user, err
	}
	return u.userRepo.Create(user)
}

func (u *UserService) Register(phone, password string) (entities.User, error) {
	user, err := entities.NewUser(phone, password)
	if err != nil {
		return *user, err
	}
	return u.userRepo.Create(user)
}

func (u *UserService) VerifyPhone(phone, code string) (entities.User, error) {
	user, err := entities.NewUser(phone, code)
	if err != nil {
		return *user, err
	}
	return u.userRepo.Create(user)
}
