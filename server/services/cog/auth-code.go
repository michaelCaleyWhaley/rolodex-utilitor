package cogHelpers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"utilitor/initialisers"

	"github.com/gin-gonic/gin"
)

type auTokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	IdToken      string `json:"id_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
}

func PostAuthCode(c *gin.Context, code string, origin string) (auTokenResponse, error) {
	returnUrl := initialisers.GetConfig().ReturnUrl

	req, nrErr := http.NewRequest("POST", fmt.Sprintf("https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/oauth2/token?grant_type=authorization_code&code=%s&redirect_uri=%s", code, returnUrl), bytes.NewBuffer([]byte{}))
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Basic "+os.Getenv("BASE_64_CLIENT_DETAILS"))
	if nrErr != nil {
		return auTokenResponse{}, errors.New("auth code request")
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return auTokenResponse{}, errors.New("auth code doErr")
	}

	defer resp.Body.Close()
	if resp.Status != "200 OK" {
		return auTokenResponse{}, errors.New("auth code not 200")
	}

	body, _ := io.ReadAll(resp.Body)
	var tokenResp auTokenResponse
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return auTokenResponse{}, errors.New("auth code unmarshall json")
	}

	return tokenResp, nil
}
