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
	Address   Address
	Email     string
}

var contacts = []Contact{
	{
		FirstName: "Michael",
		LastName:  "Caley",
		Address: Address{
			Line1:    "53 Speed Way",
			Line2:    "Shed Life",
			Line3:    "",
			PostCode: "SHED L1F3",
		},
		Email: "Kneedeepwater@hotmail.com",
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
