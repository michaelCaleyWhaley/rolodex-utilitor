package database

import (
	"context"
	"log"
	"utilitor/constants"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go/aws"
)

func (basics DynamoTable) create(UserName string, email string) (UserData, error) {
	var contactRes UserData

	contact, err := attributevalue.MarshalMap(UserData{UserName: UserName, Email: email, Contacts: []constants.Contact{}})
	if err != nil {
		panic(err)
	}

	response, err := basics.DynamoDbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(basics.TableName), Item: contact,
	})

	if err != nil {
		log.Printf("Couldn't get info about %v. Here's why: %v\n", UserName, err)
	} else {
		err = attributevalue.UnmarshalMap(response.Attributes, &contactRes)
		if err != nil {
			log.Printf("Couldn't unmarshal response. Here's why: %v\n", err)
		}
	}

	return contactRes, err
}

func CreateUser(UserName string, email string) (UserData, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	client := dynamodb.NewFromConfig(cfg)

	dynamoTable := DynamoTable{TableName: constants.DB_TABLE_NAME,
		DynamoDbClient: client}

	userData, err := dynamoTable.create(UserName, email)

	return userData, err

}
