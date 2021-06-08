package repositories

import (
	"github.com/wenzhongchi/contactly/backend/src/entities"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindByID(id entities.ID) (entities.User, error)
	FindByPhone(phone string) (entities.User, error)
	FindByEmail(email string) (entities.User, error)
	FindByName(searchText string) ([]entities.User, error)
	Create(user *entities.User) (entities.User, error)
	UpdatePassword(id entities.ID, password string) error
}

type UserRepo struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &UserRepo{
		DB: db,
	}
}

func (u *UserRepo) FindByID(id entities.ID) (entities.User, error) {
	user := entities.User{}
	err := u.DB.Where("id = ?", id).First(&user).Error
	return user, err
}

func (u *UserRepo) FindByPhone(phone string) (entities.User, error) {
	user := entities.User{}
	err := u.DB.Where("phone = ?", phone).First(&user).Error
	return user, err
}

func (u *UserRepo) FindByEmail(email string) (entities.User, error) {
	user := entities.User{}
	err := u.DB.Where("email = ?", email).First(&user).Error
	return user, err
}

func (u *UserRepo) FindByName(searchText string) ([]entities.User, error) {
	users := []entities.User{}
	likeText := "%" + searchText + "%"
	err := u.DB.Where("name ILIKE ?", likeText).First(&users).Error
	return users, err
}

func (u *UserRepo) Create(user *entities.User) (entities.User, error) {
	return *user, u.DB.Create(&user).Error
}

func (u *UserRepo) UpdatePassword(id entities.ID, password string) error {
	return u.DB.Model(&entities.User{}).Where("id = ?", id).Updates(entities.User{Password: password}).Error
}
