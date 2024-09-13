package constants

type Address struct {
	Line1    string
	Line2    string
	Line3    string
	PostCode string
}

type Contact struct {
	FirstName    string
	LastName     string
	Company      string
	Address      Address
	Email        string
	PhoneNo      string
	ServiceStart string
	ServiceFreq  int64
}
