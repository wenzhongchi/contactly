package main

import (
	"errors"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/wenzhongchi/contactly/backend/src/libs/logger"
	"github.com/wenzhongchi/contactly/backend/src/utils"
	"go.uber.org/zap"
)

func handler(request events.APIGatewayCustomAuthorizerRequest) (events.APIGatewayCustomAuthorizerResponse, error) {
	token := request.AuthorizationToken
	tokenSlice := strings.Split(token, " ")

	var bearerToken string
	var bearerPrefix string

	if len(tokenSlice) == 2 {
		bearerPrefix = tokenSlice[0]
		bearerToken = tokenSlice[1]
	}

	if bearerToken == "" || bearerPrefix != "Bearer" {
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized")
	}

	userID, err := utils.ValidateAccessToken(bearerToken)
	if err != nil {
		logger.Instance.Error("failed to decode access token", zap.Error(err))
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized")
	}

	return generatePolicy(userID, "Allow", request.MethodArn), nil
}

func generatePolicy(principalID, effect, resource string) events.APIGatewayCustomAuthorizerResponse {
	authResponse := events.APIGatewayCustomAuthorizerResponse{PrincipalID: principalID}

	if effect != "" && resource != "" {
		authResponse.PolicyDocument = events.APIGatewayCustomAuthorizerPolicy{
			Version: "2012-10-17",
			Statement: []events.IAMPolicyStatement{
				{
					Action:   []string{"execute-api:Invoke"},
					Effect:   effect,
					Resource: []string{resource},
				},
			},
		}
	}

	return authResponse
}

func main() {
	lambda.Start(handler)
}
