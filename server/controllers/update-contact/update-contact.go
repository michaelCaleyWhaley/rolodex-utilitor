package updateContact

import (
	"net/http"
	"utilitor/constants"
	cogHelpers "utilitor/services/cog"
	"utilitor/services/database"

	"github.com/gin-gonic/gin"
)

type AddressJson struct {
	Line1    string `json:"Line1"`
	Line2    string `json:"Line2"`
	Line3    string `json:"Line3"`
	PostCode string `json:"PostCode"`
}

type ContactJson struct {
	FirstName    string `json:"FirstName"`
	LastName     string `json:"LastName"`
	Company      string `json:"Company"`
	Address      AddressJson
	Email        string `json:"Email"`
	PhoneNo      string `json:"PhoneNo"`
	ServiceStart string `json:"ServiceStart"`
	ServiceFreq  int64  `json:"ServiceFreq"`
}

func Controller(c *gin.Context) {
	user, hasUser := c.Get("User")
	typedUser, ok := user.(cogHelpers.UserInfoTokenResponse)
	if !hasUser && !ok {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User not found.",
		})
		return
	}

	var updatedContact constants.Contact
	if err := c.BindJSON(&updatedContact); err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Invalid contact details.",
		})
		return
	}

	update, updateContactErr := database.UpdateContact(typedUser.Username, typedUser.Email, updatedContact)

	if updateContactErr != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Update contact failed.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts": update.Contacts,
	})
}
