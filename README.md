# rolodex-utilitor

In side this project you will find two folders at root, client and server.

- The client houses a next js app which deploys as a static website.
- The server is a Go api which is deployed as a lambda.

## Architecture

![architecture](./rolodex-utilitor-architecture.jpg)

## Infrastructure

All infra for client and server is located at root in the platform_config folder.
 
s3 bucket name for infrastructure `rolodex-utilitor-terraform-state`.

michael_caley@******.com

http://rolodex-utilitor-website.s3-website.eu-west-2.amazonaws.com/

## Todo

- deploy api gateway
- direct cloudfront origin to api gateway
- how is local development going to work