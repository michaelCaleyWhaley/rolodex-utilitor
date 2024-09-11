package database

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go/aws"
)

type TableBasics struct {
	DynamoDbClient *dynamodb.Client
	TableName      string
}

type ContactQuery struct {
	UserId string
	Email  string
}

// https://docs.aws.amazon.com/code-library/latest/ug/go_2_dynamodb_code_examples.html#serverless_examples

func (basics TableBasics) getUserContacts(userId string, email string) (ContactQuery, error) {
	contact := ContactQuery{UserId: userId, Email: email}

	response, err := basics.DynamoDbClient.GetItem(context.TODO(), &dynamodb.GetItemInput{
		Key: contact.GetKey(), TableName: aws.String(basics.TableName),
	})
	// if err != nil {
	// 	log.Printf("Couldn't get info about %v. Here's why: %v\n", title, err)
	// } else {
	// 	err = attributevalue.UnmarshalMap(response.Item, &movie)
	// 	if err != nil {
	// 		log.Printf("Couldn't unmarshal response. Here's why: %v\n", err)
	// 	}
	// }
	// return movie, err
}

// 16725254-e031-70c3-2839-d032122c920e
func GetContacts() {
	// Load the default AWS config (from environment, shared credentials file, etc.)
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-west-2"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Create a DynamoDB client
	client := dynamodb.NewFromConfig(cfg)

	tableBasics := TableBasics{TableName: "contacts",
		DynamoDbClient: client}

	// tableNames, _ := tableBasics.ListTables()

	log.Println("here: ", tableNames)
}
