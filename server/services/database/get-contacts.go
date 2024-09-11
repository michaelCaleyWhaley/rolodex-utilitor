package database

import (
	"context"
	"log"
	"utilitor/constants"
	"utilitor/controllers/contacts"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go/aws"
)

type DynamoTable struct {
	DynamoDbClient *dynamodb.Client
	TableName      string
}

type UserData struct {
	UserName string             `dynamodbav:"UserName"`
	Email    string             `dynamodbav:"Email"`
	Contacts []contacts.Contact `dynamodbav:"Contacts"`
}

func (contact UserData) GetKey() map[string]types.AttributeValue {
	UserName, err := attributevalue.Marshal(contact.UserName)
	if err != nil {
		panic(err)
	}
	email, err := attributevalue.Marshal(contact.Email)
	if err != nil {
		panic(err)
	}
	return map[string]types.AttributeValue{"UserName": UserName, "Email": email}
}

func (basics DynamoTable) getUserData(UserName string, email string) (UserData, error) {
	contact := UserData{UserName: UserName, Email: email}
	var contactRes UserData

	response, err := basics.DynamoDbClient.GetItem(context.TODO(), &dynamodb.GetItemInput{
		Key: contact.GetKey(), TableName: aws.String(basics.TableName),
	})
	if err != nil {
		log.Printf("Couldn't get info about %v. Here's why: %v\n", UserName, err)
	} else {
		err = attributevalue.UnmarshalMap(response.Item, &contactRes)
		if err != nil {
			log.Printf("Couldn't unmarshal response. Here's why: %v\n", err)
		}
	}
	return contactRes, err
}

func GetContacts() {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	client := dynamodb.NewFromConfig(cfg)

	dynamoTable := DynamoTable{TableName: constants.DB_TABLE_NAME,
		DynamoDbClient: client}

	userData, err := dynamoTable.getUserData("16725254-e031-70c3-2839-d032122c920e", "kneedeepwater@hotmail.com")

	if err != nil {
		log.Println("ERROR: ", err)

	} else {

		log.Println("here: ", userData)
	}

}
