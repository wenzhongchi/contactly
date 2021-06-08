package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/wenzhongchi/contactly/backend/src/libs/logger"
	"github.com/wenzhongchi/contactly/backend/src/libs/response"
	"github.com/wenzhongchi/contactly/backend/src/repositories"
	"github.com/wenzhongchi/contactly/backend/src/services"

	"go.uber.org/zap"
)

type Handler struct {
	userRepo repositories.UserRepository
}

func (h *Handler) handleRequest(_ context.Context, req *events.APIGatewayWebsocketProxyRequest) (response.ApiResponse, error) {
	defer func() {
		_ = logger.Instance.Sync()
	}()

	logger.Instance.Info("request query",
		zap.Any("queries", req.QueryStringParameters))

	logger.Instance.Info("websocket connect",
		zap.String("requestId", req.RequestContext.RequestID),
		zap.String("connectionId", req.RequestContext.ConnectionID))

	user, err := h.userRepo.FindByPhone("292929")
	if err != nil {
		logger.Instance.Error("failed to cache connection details",
			zap.Error(err))

		return response.InternalServerErrorResponse(101, "internal server error"), err
	}

	logger.Instance.Info("websocket connection saved",
		zap.String("result", user.ID.String()))

	return response.OkResponse(), nil
}

func main() {
	conn := services.ConnectDB()
	userRepo := repositories.NewUserRepository(conn)
	handler := &Handler{userRepo: userRepo}

	lambda.Start(handler.handleRequest)
}
