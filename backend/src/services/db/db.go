package db

import (
	"fmt"
	"os"

	"github.com/wenzhongchi/contactly/backend/src/entities"
	"github.com/wenzhongchi/contactly/backend/src/libs/logger"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

//ConnectDB function: Make database connection
func ConnectDB() *gorm.DB {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	//define DB connection string
	dbURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, dbPort, dbUser, dbName, dbPassword)

	//connect to db
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		logger.Instance.Error("db fail connect", zap.Error(err))
		panic(err)
	}

	// close db when not in use
	// defer db.Close()

	// migrate the schema
	db.AutoMigrate(&entities.User{})
	logger.Instance.Info("db connected", zap.Error(err))

	return db
}
