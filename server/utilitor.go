package main

import (
	"context"
	"log"
	"os"
	addContact "utilitor/controllers/add-contact"
	"utilitor/controllers/code"
	"utilitor/controllers/contacts"
	updateContact "utilitor/controllers/update-contact"
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
	r.POST("/api/contact/add", middleware.VerifyAccessToken, addContact.Controller)
	r.POST("/api/contact/update", middleware.VerifyAccessToken, updateContact.Controller)

	r.GET("/api/contact/list", middleware.VerifyAccessToken, contacts.Controller)
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
