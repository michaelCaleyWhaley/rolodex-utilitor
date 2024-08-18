package initialisers

import (
	"encoding/base64"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	ReturnUrl string
}

type appConfig struct {
	local config
	prod  config
}

var setAppConfig = appConfig{
	local: config{
		ReturnUrl: "http://localhost:3000/login",
	},
	prod: config{
		ReturnUrl: "https://d12si818kne643.cloudfront.net/login",
	},
}

var isLocal = os.Args[len(os.Args)-1] == "--local"

func base64Encode(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

func LoadEnvVars() {
	if isLocal {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	clientId := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	os.Setenv("BASE_64_CLIENT_DETAILS", base64Encode(clientId+":"+clientSecret))
}

func GetConfig() config {
	if isLocal {
		return setAppConfig.local
	}

	return setAppConfig.prod
}
