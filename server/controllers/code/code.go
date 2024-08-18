package code

import (
	"net/http"
	"strings"
	awsHelpers "utilitor/services/cog"
	servicesGin "utilitor/services/gin"

	"github.com/gin-gonic/gin"
)

func Controller(c *gin.Context) {
	origin := c.Request.Header.Get("Origin")
	code, _ := c.GetPostForm("code")

	tokenResp, err := awsHelpers.PostAuthCode(c, code, origin)
	if err != nil {
		servicesGin.ErrRedirect(c, origin, err, "Post auth code.")
		return
	}

	domain := strings.Split(c.Request.Host, ":")[0]
	c.SetCookie("access_token", tokenResp.AccessToken, 86400, "/", domain, true, true)
	c.SetCookie("refresh_token", tokenResp.RefreshToken, 2628000, "/", domain, true, true)
	c.Redirect(http.StatusFound, origin+"/dashboard")
}
