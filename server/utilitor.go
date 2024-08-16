package main

import (
	"context"
	"log"
	"os"
	"utilitor/controllers/code"
	"utilitor/initialisers"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda
var isLocal = os.Args[len(os.Args)-1] == "--local"

func routes(r *gin.Engine) {
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
	})

	r.POST("/api/code", code.Controller)

}

func init() {
	initialisers.LoadEnvVars()
	// stdout and stderr are sent to AWS CloudWatch Logs
	log.Printf("Gin cold start")
	r := gin.Default()
	routes(r)

	if isLocal {
		r.Run("localhost:4000")
		return
	}
	ginLambda = ginadapter.New(r)

}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// If no name is provided in the HTTP request body, throw an error
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	if isLocal {
		return
	}
	lambda.Start(Handler)
}

// #####################################
// Simple working example
// #####################################

// package main

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"

// 	"github.com/aws/aws-lambda-go/events"
// 	"github.com/aws/aws-lambda-go/lambda"
// )

// func HandleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

// 	data := map[string]string{"test": "test string"}
// 	responseJSON, err := json.Marshal(data)
// 	fmt.Println(err)

// 	return events.APIGatewayProxyResponse{Body: string(responseJSON), StatusCode: 200}, nil
// }

// func main() {
// 	lambda.Start(HandleRequest)
// }
