package code

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	IdToken      string `json:"id_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
}

func errRedirect(c *gin.Context, origin string, err error) {
	fmt.Print("utilitor error:", err)
	c.Redirect(http.StatusFound, origin+"/404")
}

func Controller(c *gin.Context) {
	origin := c.Request.Header.Get("Origin")
	code, _ := c.GetPostForm("code")

	req, err := http.NewRequest("POST", fmt.Sprintf("https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/oauth2/token?grant_type=authorization_code&code=%s&redirect_uri=http://localhost:3000/login", code), bytes.NewBuffer([]byte{}))
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Basic "+os.Getenv("BASE_64_CLIENT_DETAILS"))
	if err != nil {
		errRedirect(c, origin, err)
		return
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		errRedirect(c, origin, err)
		return
	}

	defer resp.Body.Close()
	if resp.Status != "200 OK" {
		errRedirect(c, origin, err)
		return
	}

	body, _ := io.ReadAll(resp.Body)
	var tokenResp TokenResponse
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		errRedirect(c, origin, err)
		return
	}

	domain := strings.Split(c.Request.Host, ":")[0]
	c.SetCookie("access_token", tokenResp.AccessToken, 86400, "/", domain, true, true)
	c.SetCookie("refresh_token", tokenResp.RefreshToken, 2628000, "/", domain, true, true)
	c.Redirect(http.StatusFound, origin+"/dashboard")
}
