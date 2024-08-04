resource "aws_s3_bucket" "rolodex-utilitor-terraform" {
  bucket = "rolodex-utilitor-terraform-state"

  tags = {
    Name        = "rolodex-utilitor-terraform-state"
    Environment = "prod"
  }
}

terraform {
  backend "s3" {
    bucket = "rolodex-utilitor-terraform-state"
    region = "eu-west-2"
  }
}
