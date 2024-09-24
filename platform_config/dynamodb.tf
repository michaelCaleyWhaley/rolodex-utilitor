resource "aws_dynamodb_table" "rolodex-dynamodb-table" {
  name           = "contacts"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "UserName"
  range_key      = "Email"

  attribute {
    name = "UserName"
    type = "S"
  }

  attribute {
    name = "Email"
    type = "S"
  }
}
