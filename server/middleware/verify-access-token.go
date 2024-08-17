package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func VerifyAccessToken(c *gin.Context) {
	origin := c.Request.Header.Get("Origin")

	c.Redirect(http.StatusFound, origin+"/middleware")
}
