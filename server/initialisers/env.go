package initialisers

import (
	"encoding/base64"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func base64Encode(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

func LoadEnvVars() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	clientId := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	os.Setenv("BASE_64_CLIENT_DETAILS", base64Encode(clientId+":"+clientSecret))

}
