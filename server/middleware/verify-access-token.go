package middleware

import (
	"log"
	"net/http"
	"strings"
	"utilitor/constants"
	"utilitor/initialisers"
	cogHelpers "utilitor/services/cog"
	servicesGin "utilitor/services/gin"

	"github.com/gin-gonic/gin"
)

func VerifyAccessToken(c *gin.Context) {
	log.Println("LOG: ")

	origin := c.Request.Header.Get("Origin")

	authCookie, atCookieErr := c.Request.Cookie(constants.AUTH)

	authSlice := strings.Split(authCookie.Value, constants.COOKIE_SEPERATOR)

	if atCookieErr != nil && len(authSlice) == 2 {
		servicesGin.ErrRedirect(c, origin, atCookieErr, "no auth cookie")
		return
	}

	accessToken := authSlice[0]
	userResp, userErr := cogHelpers.UserInfo(c, accessToken, origin)
	if userErr == nil {
		c.Set("User", userResp)
		return
	}

	refreshToken := authSlice[1]
	refreshResp, rtErr := cogHelpers.RefreshToken(c, refreshToken, origin)
	if rtErr != nil {
		servicesGin.ErrRedirect(c, origin, rtErr, "Post auth code.")
		return
	}

	userRetryResp, userRetryErr := cogHelpers.UserInfo(c, refreshResp.AccessToken, origin)
	if userRetryErr == nil {
		domain := initialisers.GetConfig().CookieDomain
		c.SetCookie(constants.AUTH, refreshResp.AccessToken+constants.COOKIE_SEPERATOR+refreshToken, 2628000, "/", domain, true, true)
		c.Set("User", userRetryResp)
		return
	} else {
		c.Redirect(http.StatusFound, origin+"/")
	}

}
