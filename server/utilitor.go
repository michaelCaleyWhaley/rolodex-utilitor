// package main

// import (
// 	"context"
// 	"log"
// 	"os"

// 	"github.com/aws/aws-lambda-go/events"
// 	"github.com/aws/aws-lambda-go/lambda"
// 	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
// 	"github.com/gin-gonic/gin"
// )

// var ginLambda *ginadapter.GinLambda

// func routes(r *gin.Engine) {
// 	r.Use(func(c *gin.Context) {
// 		c.Header("Access-Control-Allow-Origin", "*")
// 	})

// 	r.GET("/ping", func(c *gin.Context) {
// 		c.JSON(200, gin.H{
// 			"message": "pong",
// 		})
// 	})

// }

// func init() {
// 	// stdout and stderr are sent to AWS CloudWatch Logs
// 	log.Printf("Gin cold start")
// 	r := gin.Default()
// 	routes(r)

// 	isLocal := os.Args[len(os.Args)-1] == "--local"
// 	if isLocal {
// 		r.Run("localhost:4000")
// 		return
// 	}
// 	ginLambda = ginadapter.New(r)

// }

// func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
// 	// If no name is provided in the HTTP request body, throw an error
// 	return ginLambda.ProxyWithContext(ctx, req)
// }

// func main() {
// 	isLocal := os.Args[len(os.Args)-1] == "--local"
// 	if isLocal {
// 		return
// 	}
// 	lambda.Start(Handler)
// }

package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
	Name string `json:"name"`
}

type Body struct {
	Message string `json:message`
}

type Response struct {
	statusCode int64
	body       []byte
}

func HandleRequest(ctx context.Context, event *MyEvent) (Response, error) {
	// message := "Hello!"
	// return &message, nil

	jsonData, err := json.Marshal(Body{Message: "Hello!"})

	if err != nil {
		return Response{statusCode: 123, body: jsonData}, nil
	}

	return Response{
		statusCode: 200,
		body:       jsonData,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
