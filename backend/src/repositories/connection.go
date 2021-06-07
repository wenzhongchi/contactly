package repositories

import (
	"github.com/wenzhongchi/contactly/backend/src/entities"
	"gorm.io/gorm"
)

type ConnectionRepository interface {
	FindByID(id entities.ID) (entities.Connection, error)
	FindByConnectionID(connectionID entities.ID) (entities.Connection, error)
	FindByUserID(userID entities.ID) (entities.Connection, error)
	Create(connection *entities.Connection) (entities.Connection, error)
}

type ConnectionRepo struct {
	DB *gorm.DB
}

func CreateConnectionRepository(db *gorm.DB) ConnectionRepository {
	return &ConnectionRepo{
		DB: db,
	}
}

func (c *ConnectionRepo) FindByID(id entities.ID) (entities.Connection, error) {
	connection := entities.Connection{}
	err := c.DB.Where("id = ?", id).Find(&connection).Error
	return connection, err
}

func (c *ConnectionRepo) FindByConnectionID(connectionID entities.ID) (entities.Connection, error) {
	connection := entities.Connection{}
	err := c.DB.Preload("User").Where("connection_id = ?", connectionID).Find(&connection).Error
	return connection, err
}

func (c *ConnectionRepo) FindByUserID(userID entities.ID) (entities.Connection, error) {
	connection := entities.Connection{}
	err := c.DB.Preload("User").Where("user_id = ?", userID).Find(&connection).Error
	return connection, err
}

func (c *ConnectionRepo) Create(connection *entities.Connection) (entities.Connection, error) {
	return *connection, c.DB.Create(&connection).Error
}
