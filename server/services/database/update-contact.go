package database

import (
	"context"
	"errors"
	"log"
	"utilitor/constants"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go/aws"
)

func (basics DynamoTable) update(UserName string, email string, updatedList []constants.Contact) (UserData, error) {
	contact := UserData{UserName: UserName, Email: email}
	var contactRes UserData

	expName := expression.Name("Contacts")
	expValue := expression.Value(updatedList)
	update := expression.Set(expName, expValue)
	expr, err := expression.NewBuilder().WithUpdate(update).Build()

	if err != nil {
		log.Printf("Couldn't build expression for update. Here's why: %v\n", err)
	} else {
		response, err := basics.DynamoDbClient.UpdateItem(context.TODO(), &dynamodb.UpdateItemInput{
			Key:                       contact.GetKey(),
			TableName:                 aws.String(basics.TableName),
			ExpressionAttributeNames:  expr.Names(),
			ExpressionAttributeValues: expr.Values(),
			UpdateExpression:          expr.Update(),
			ReturnValues:              types.ReturnValueUpdatedNew,
		})

		if err != nil {
			log.Printf("Couldn't get info about %v. Here's why: %v\n", UserName, err)
		} else {
			err = attributevalue.UnmarshalMap(response.Attributes, &contactRes)
			if err != nil {
				log.Printf("Couldn't unmarshal response. Here's why: %v\n", err)
			}
		}
	}

	return contactRes, err
}

func replaceContact(contacts []constants.Contact, updatedContact constants.Contact) []constants.Contact {
	for i, v := range contacts {
		if v.ContactId == updatedContact.ContactId {
			contacts[i] = updatedContact
			break
		}
	}
	return contacts
}

func UpdateContact(UserName string, email string, updatedContact constants.Contact) (UserData, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	client := dynamodb.NewFromConfig(cfg)

	dynamoTable := DynamoTable{TableName: constants.DB_TABLE_NAME,
		DynamoDbClient: client}

	userData, err := dynamoTable.getUserData(UserName, email)

	if len(userData.UserName) == 0 || err != nil {
		return UserData{}, errors.New("no user found")
	}

	updatedList := replaceContact(userData.Contacts, updatedContact)
	updatedUserData, err := dynamoTable.update(UserName, email, updatedList)

	return updatedUserData, err

}
