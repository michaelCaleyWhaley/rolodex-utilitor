package main

import (
	"context"
	"log"
	"os"
	addcontact "utilitor/controllers/add-contact"
	"utilitor/controllers/code"
	"utilitor/controllers/contacts"
	"utilitor/initialisers"
	"utilitor/middleware"
	"utilitor/services/database"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda
var isLocal = os.Args[len(os.Args)-1] == "--local"

func routes(r *gin.Engine) {
	// //////////////////////
	database.GetContacts()
	// //////////////////////

	r.Use(middleware.CrossOrigin)
	r.POST("/api/code", code.Controller)
	r.GET("/api/contact/list", middleware.VerifyAccessToken, contacts.Controller)
	r.POST("/api/contact/add", middleware.VerifyAccessToken, addcontact.Controller)
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
