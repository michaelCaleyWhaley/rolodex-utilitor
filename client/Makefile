npm/install:
	npm ci

build/application:
	npm run build

rewrite/extension:
	node ./deployment/rewrite-extension.js

s3/clean:
	aws s3 rm s3://rolodex-utilitor-website --recursive

s3/push/html:
	aws s3 sync ./out s3://rolodex-utilitor-website --exclude "*.*" --content-type text/html --content-language html

s3/push/remaining:
	aws s3 sync ./out s3://rolodex-utilitor-website --include "*.*"