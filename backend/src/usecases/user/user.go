package usecases

import (
	"github.com/wenzhongchi/contactly/backend/src/entities"
	"github.com/wenzhongchi/contactly/backend/src/repositories"
)

type UserUsecase interface {
	CreateUser(phone, password, firstName, lastName string) (entities.User, error)
}

type UserService struct {
	userRepo repositories.UserRepository
}

func CreateUserUsecase(u repositories.UserRepository) *UserService {
	return &UserService{userRepo: u}
}

func (u *UserService) CreateUser(phone, password, firstName, lastName string) (entities.User, error) {
	user, err := entities.CreateUser(phone, password, firstName, lastName)
	if err != nil {
		return *user, err
	}
	return u.userRepo.Create(user)
}
