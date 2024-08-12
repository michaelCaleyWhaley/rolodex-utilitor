server/start:
	go run utilitor.go
server/local: 
	go run utilitor.go --local
server/build:
	GOARCH=amd64 GOOS=linux go build -o bootstrap utilitor.go
server/zip:
	zip deployment.zip bootstrap