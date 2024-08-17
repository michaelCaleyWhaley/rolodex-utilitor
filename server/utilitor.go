package main

import (
	"context"
	"log"
	"os"
	"utilitor/controllers/code"
	"utilitor/initialisers"
	"utilitor/middleware"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda
var isLocal = os.Args[len(os.Args)-1] == "--local"

func routes(r *gin.Engine) {
	r.Use(middleware.CrossOrigin)
	r.POST("/api/code", code.Controller)

	// r.GET("/api/contact/list", middleware.VerifyAccessToken, func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"test": "test",
	// 	})
	// })
}

func init() {
	initialisers.LoadEnvVars()
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
