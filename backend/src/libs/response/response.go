package response

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

// Response is a typedef for the response type provided by the aws
type ApiResponse = events.APIGatewayProxyResponse

// ErrorResponse is error response
type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func jsonStringify(code int, message string) string {
	errorResponse := ErrorResponse{
		Code:    code,
		Message: message,
	}

	response, err := json.Marshal(&errorResponse)
	if err != nil {
		panic("cannot parse response")
	}

	return string(response)
}

// InternalServerErrorResponse returns an Amazon API Gateway Proxy Response configured with the correct HTTP status code
func InternalServerErrorResponse(code int, message string) ApiResponse {
	return ApiResponse{Body: jsonStringify(code, message), StatusCode: http.StatusInternalServerError}
}

// BadRequestResponse returns an Amazon API Gateway Proxy Response configured with the correct HTTP status code
func BadRequestResponse(code int, message string) ApiResponse {
	return ApiResponse{Body: jsonStringify(code, message), StatusCode: http.StatusBadRequest}
}

// OkResponse returns an Amazon API Gateway Proxy Response configured with the correct HTTP status code
func OkResponse() ApiResponse {
	return ApiResponse{StatusCode: http.StatusOK}
}
