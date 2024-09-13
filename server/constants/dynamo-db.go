package constants

var DB_TABLE_NAME string = "contacts"

type DbUser struct {
	UserName string
	Email    string
	Contacts []Contact
}
