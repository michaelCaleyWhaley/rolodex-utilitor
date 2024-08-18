package middleware

import (
	"net/http"
	"utilitor/initialisers"
	cogHelpers "utilitor/services/cog"
	servicesGin "utilitor/services/gin"

	"github.com/gin-gonic/gin"
)

func VerifyAccessToken(c *gin.Context) {
	origin := c.Request.Header.Get("Origin")

	accessToken, atCookieErr := c.Request.Cookie("ru_access_token")
	if atCookieErr != nil {
		servicesGin.ErrRedirect(c, origin, atCookieErr, "no access_token cookie")
		return
	}

	userResp, userErr := cogHelpers.UserInfo(c, accessToken.Value, origin)
	if userErr == nil {
		c.Set("User", userResp)
		return
	}

	refreshToken, rtCookieErr := c.Request.Cookie("ru_refresh_token")
	if rtCookieErr != nil {
		servicesGin.ErrRedirect(c, origin, atCookieErr, "no refresh_token cookie")
		return
	}

	refreshResp, rtErr := cogHelpers.RefreshToken(c, refreshToken.Value, origin)
	if rtErr != nil {
		servicesGin.ErrRedirect(c, origin, rtErr, "Post auth code.")
		return
	}

	userRetryResp, userRetryErr := cogHelpers.UserInfo(c, refreshResp.AccessToken, origin)
	if userRetryErr == nil {
		domain := initialisers.GetConfig().CookieDomain
		c.SetCookie("ru_access_token", refreshResp.AccessToken, 86400, "/", domain, true, true)
		c.Set("User", userRetryResp)
		return
	} else {
		c.Redirect(http.StatusFound, origin+"/")
	}

}
