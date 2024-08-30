package code

import (
	"net/http"
	"utilitor/constants"
	"utilitor/initialisers"
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
	domain := initialisers.GetConfig().CookieDomain
	c.SetCookie(constants.AUTH, tokenResp.AccessToken+constants.COOKIE_SEPERATOR+tokenResp.RefreshToken, 2628000, "/", domain, true, true)
	c.Redirect(http.StatusFound, origin+"/dashboard")
}
