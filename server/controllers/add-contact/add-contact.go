package addContact

import (
	"net/http"
	"utilitor/constants"
	cogHelpers "utilitor/services/cog"
	"utilitor/services/database"

	"github.com/gin-gonic/gin"
)

func Controller(c *gin.Context) {
	user, hasUser := c.Get("User")
	typedUser, ok := user.(cogHelpers.UserInfoTokenResponse)
	if !hasUser && !ok {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User not found.",
		})
		return
	}

	var newContact constants.Contact
	if err := c.BindJSON(&newContact); err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Invalid contact details.",
		})
		return
	}

	userData, addContactErr := database.AddContact(typedUser.Username, typedUser.Email, newContact)

	if addContactErr != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Add contact failed.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts": userData.Contacts,
	})
}
