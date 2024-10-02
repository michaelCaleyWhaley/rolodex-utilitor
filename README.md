

# rolodex-utilitor

`rolodex utilitor` is a contact management application designed specifically to help companies that provide a recurring service date to their client. A specific example being an air conditioning company that attends every 6 months to clean the unit.

- [Visit Rolodex.](https://d12si818kne643.cloudfront.net)
- [Try the demo](https://d12si818kne643.cloudfront.net/demo)

### Features
- Saved contacts to a cloud based management app accessible from any internet connected device.
- Filter contacts by service date.
- Filter contacts alphabetically.
- Search contacts by free text.

## Project Structure
The repository houses three main folders, `client`, `server` and `platform_config`.

- `client` - Contains a NextJs website which is exported statically and hosted on AWS S3.
- `server` - Contains a Go lang function that acts as a REST api for the website. This is hosted on AWS Lambda.
- `cloud_platform` - Contains Terraform files for all the infrastructure for both `client` and `server`.

## Architecture

![architecture](./rolodex-utilitor-architecture.jpg)

## Useful links

- https://v0.dev/
- https://docs.aws.amazon.com/cognito/latest/developerguide/userinfo-endpoint.html
