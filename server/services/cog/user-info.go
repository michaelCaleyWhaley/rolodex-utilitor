package cogHelpers

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type userInfoTokenResponse struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Verified string `json:"email_verified"`
}

func UserInfo(c *gin.Context, accessToken string, origin string) (userInfoTokenResponse, error) {
	req, nrErr := http.NewRequest("GET", "https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/oauth2/userInfo", nil)
	req.Header.Set("content-type", "application/x-amz-json-1.1")
	req.Header.Set("Authorization", "Bearer "+accessToken)
	if nrErr != nil {
		return userInfoTokenResponse{}, nrErr
	}

	client := &http.Client{}
	resp, doErr := client.Do(req)
	if doErr != nil {
		return userInfoTokenResponse{}, doErr
	}

	defer resp.Body.Close()
	if resp.Status != "200 OK" {
		return userInfoTokenResponse{}, errors.New("user info not 200")
	}

	body, _ := io.ReadAll(resp.Body)
	var tokenResp userInfoTokenResponse
	if jsonErr := json.Unmarshal(body, &tokenResp); jsonErr != nil {
		return userInfoTokenResponse{}, errors.New("user info unmarshall json")
	}

	if tokenResp.Verified == "false" {
		return userInfoTokenResponse{}, errors.New("user info not verified")
	}

	return tokenResp, nil
}
