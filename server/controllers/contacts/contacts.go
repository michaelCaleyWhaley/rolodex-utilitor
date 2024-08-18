package contacts

import (
	"log"
	"net/http"
	"utilitor/initialisers"

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
}

var contacts = []Contact{
	{
		FirstName: "Michael",
		LastName:  "Caley",
		Address: Address{
			Line1:    "53 Burton Road",
			Line2:    "Cottingham",
			Line3:    "",
			PostCode: "HU16 5DZ",
		},
	},
}

func Controller(c *gin.Context) {
	VerifiedUser, hasUser := c.Get("User")
	log.Println("hasUser: ", hasUser)
	log.Println("VerifiedUser: ", VerifiedUser)

	domain := initialisers.GetConfig().CookieDomain
	c.SetCookie("ru_test", "test", 86400, "/", domain, true, true)

	c.JSON(http.StatusOK, gin.H{
		"contacts": contacts,
	})
}
