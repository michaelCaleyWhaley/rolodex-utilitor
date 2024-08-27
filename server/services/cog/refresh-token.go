package cogHelpers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type rfTokenResponse struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
	IdToken     string `json:"id_token"`
	TokenType   string `json:"token_type"`
}

func RefreshToken(c *gin.Context, refreshToken string, origin string) (rfTokenResponse, error) {
	req, nrErr := http.NewRequest("POST", fmt.Sprintf("https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/oauth2/token?grant_type=refresh_token&refresh_token=%s", refreshToken), bytes.NewBuffer([]byte{}))
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Basic "+os.Getenv("BASE_64_CLIENT_DETAILS"))
	if nrErr != nil {
		return rfTokenResponse{}, errors.New("refresh token request")
	}

	client := &http.Client{}
	resp, doErr := client.Do(req)
	if doErr != nil {
		return rfTokenResponse{}, errors.New("refresh token doErr")
	}

	defer resp.Body.Close()

	if resp.Status != "200 OK" {
		return rfTokenResponse{}, errors.New("refresh token not 200")
	}

	body, _ := io.ReadAll(resp.Body)
	var tokenResp rfTokenResponse
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return rfTokenResponse{}, errors.New("refresh token unmarshall json")
	}

	return tokenResp, nil
}
