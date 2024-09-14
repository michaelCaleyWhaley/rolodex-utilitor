package contacts

import (
	"net/http"
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

	userData, err := database.GetContacts(typedUser.Username, typedUser.Email)
	if err != nil {
		_, createErr := database.CreateUser(typedUser.Username, typedUser.Email)

		if createErr != nil {
			c.JSON(http.StatusForbidden, gin.H{
				"message": "User data not found.",
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts":     userData.Contacts,
		"VerifiedUser": user,
	})
}
