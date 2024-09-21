package removeContact

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

	var removedContact constants.Contact
	if err := c.BindJSON(&removedContact); err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Invalid contact details.",
		})
		return
	}

	remove, removeContactErr := database.RemoveContact(typedUser.Username, typedUser.Email, removedContact)

	if removeContactErr != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "remove contact failed.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts": remove.Contacts,
	})
}
