server/start:
	go run utilitor.go
server/local: 
	go run utilitor.go --local
server/build:
	GOARCH=amd64 GOOS=linux go build -o bootstrap utilitor.go
server/zip:
	zip deployment.zip bootstrap

aws/lambda/update/actions:
	@zip_file_path="${GITHUB_WORKSPACE}/deployment.zip"; \
	aws lambda update-function-code \
		--region eu-west-2 \
		--function-name rolodex_utilitor_function \
		--zip-file "fileb://$${zip_file_path}"

aws/lambda/update/local:
	@zip_file_path="./deployment.zip"; \
	aws lambda update-function-code \
		--region eu-west-2 \
		--function-name rolodex_utilitor_function \
		--zip-file "fileb://$${zip_file_path}"

test/test:
	ls