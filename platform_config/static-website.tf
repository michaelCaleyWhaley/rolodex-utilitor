# static website S3 bucket
resource "aws_s3_bucket" "rolodex-utilitor-website" {
  bucket = "rolodex-utilitor-website"

  tags = {
    Name = "rolodex website bucket"
  }
}

resource "aws_s3_bucket_website_configuration" "rolodex-utilitor-website-config" {
  bucket = "rolodex-utilitor-website"

  index_document {
    suffix = "index"
  }
  error_document {
    key = "404"
  }
}

# manually enable public access on AWS
resource "aws_s3_bucket_public_access_block" "rolodex-utilitor-website-public" {
  bucket = aws_s3_bucket.rolodex-utilitor-website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "allow-public-access" {
  bucket = "rolodex-utilitor-website"
  policy = data.aws_iam_policy_document.s3_read_permissions.json
}


data "aws_iam_policy_document" "s3_read_permissions" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    sid    = "PublicReadGetObject"
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    resources = ["arn:aws:s3:::rolodex-utilitor-website/*"]
  }
}


##############################
###### static website redirect
##############################
# resource "aws_s3_bucket" "rolodex-utilitor-website-redirect" {
#   bucket = "rolodex-utilitor-website"

#   tags = {
#     Name = "code lab website bucket-redirect"
#   }
# }

# resource "aws_s3_bucket_website_configuration" "rolodex-utilitor-website-config-redirect" {
#   bucket = aws_s3_bucket.rolodex-utilitor-website-redirect.bucket


#   redirect_all_requests_to {
#     host_name = aws_route53_record.www_subdomain.fqdn
#     protocol  = "https"
#   }
# }

# # manually enable public access on AWS
# resource "aws_s3_bucket_public_access_block" "access_block_redirect" {
#   bucket = aws_s3_bucket.rolodex-utilitor-website-redirect.id

#   block_public_acls       = false
#   block_public_policy     = false
#   ignore_public_acls      = false
#   restrict_public_buckets = false
# }

# resource "aws_s3_bucket_policy" "allow-public-access-redirect" {
#   bucket = aws_s3_bucket.rolodex-utilitor-website-redirect.bucket
#   policy = data.aws_iam_policy_document.s3_read_permissions_redirect.json
# }

# data "aws_iam_policy_document" "s3_read_permissions_redirect" {
#   statement {
#     principals {
#       type        = "AWS"
#       identifiers = ["*"]
#     }
#     sid    = "PublicReadGetObject"
#     effect = "Allow"
#     actions = [
#       "s3:GetObject",
#     ]
#     resources = ["arn:aws:s3:::caleycodelab.com/*"]
#   }
# }

# output "out_log" {
#   value = aws_s3_bucket.rolodex-utilitor-website-redirect
# }
