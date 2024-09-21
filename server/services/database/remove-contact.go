package database

import (
	"context"
	"errors"
	"log"
	"slices"
	"utilitor/constants"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

func findRemoveContact(contacts []constants.Contact, updatedContact constants.Contact) []constants.Contact {
	for i, v := range contacts {
		if v.ContactId == updatedContact.ContactId {
			contacts = slices.Delete(contacts, i, i+1)
			break
		}
	}
	return contacts
}

func RemoveContact(UserName string, email string, updatedContact constants.Contact) (UserData, error) {
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

	updatedList := findRemoveContact(userData.Contacts, updatedContact)
	updatedUserData, err := dynamoTable.update(UserName, email, updatedList)

	return updatedUserData, err

}
