package middleware

import (
	"github.com/gin-gonic/gin"
)

func CrossOrigin(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Credentials", "true")
}
