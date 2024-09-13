package database

import (
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

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
