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
	FirstName string
	LastName  string
	Company   string
	Address   Address
	Email     string
	PhoneNo   string
}

var contacts = []Contact{
	{
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Kneedeepwater@hotmail.com",
		PhoneNo: "0775349612",
	}, {
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Kneedeepwater@hotmail.com",
		PhoneNo: "0775349612",
	}, {
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Kneedeepwater@hotmail.com",
		PhoneNo: "0775349612",
	}, {
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Kneedeepwater@hotmail.com",
		PhoneNo: "0775349612",
	}, {
		FirstName: "Michael",
		LastName:  "Caley",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Kneedeepwater@hotmail.com",
		PhoneNo: "0775349612",
	},
	{
		FirstName: "Sophie",
		LastName:  "Tan",
		Company:   "Globo ltd",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email:   "Shee@hotmail.com",
		PhoneNo: "0775349612",
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
