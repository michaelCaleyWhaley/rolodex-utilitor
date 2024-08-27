package servicesGin

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TypeErrRedirect func(c *gin.Context, origin string, err error, message string)

func ErrRedirect(c *gin.Context, origin string, err error, message string) {
	fmt.Print("utilitor error:", err, message)
	c.Redirect(http.StatusFound, origin+"/404")
}
