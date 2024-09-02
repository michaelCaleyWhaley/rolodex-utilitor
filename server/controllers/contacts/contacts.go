package contacts

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

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

var contacts = []Contact{
	{
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "10 Burton Road",
			Line2:    "Cottingham",
			Line3:    "",
			PostCode: "HU16 5DZ",
		},
		Email:        "Kneedeepwater@hotmail.com",
		PhoneNo:      "0775349612",
		ServiceStart: "2017-06-01",
		ServiceFreq:  6,
	},
	{
		FirstName: "Sophie",
		LastName:  "Aaley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "10 Burton Road",
			Line2:    "Cottingham",
			Line3:    "",
			PostCode: "HU16 5DZ",
		},
		Email:        "Kneedeepwater@hotmail.com",
		PhoneNo:      "0775349612",
		ServiceStart: "2017-06-01",
		ServiceFreq:  6,
	},
}

func Controller(c *gin.Context) {
	user, hasUser := c.Get("User")
	if !hasUser {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User not found.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts":     contacts,
		"VerifiedUser": user,
	})
}
