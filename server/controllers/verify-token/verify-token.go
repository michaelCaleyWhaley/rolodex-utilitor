package verifytoken

import (
	"net/http"
	cogHelpers "utilitor/services/cog"

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

	c.JSON(http.StatusOK, gin.H{
		"VerifiedUser": typedUser,
	})
}
