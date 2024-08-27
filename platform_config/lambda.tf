####################################################
# SHARED
####################################################

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "rolodex_utilitor_lambda_role" {
  name               = "rolodex_utilitor_basic-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}


resource "aws_iam_policy" "function_logging_policy" {
  name = "function-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
  role       = aws_iam_role.rolodex_utilitor_lambda_role.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}

# resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
#   role       = aws_iam_role.rolodex_utilitor_lambda_role.id
#   policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
# }

# resource "aws_iam_role_policy_attachment" "ses_policy_attachment" {
#   role       = aws_iam_role.rolodex_utilitor_lambda_role.id
#   policy_arn = "arn:aws:iam::aws:policy/AmazonSESFullAccess"
# }

####################################################
# UNPROTECTED LAMBDA
####################################################
resource "aws_lambda_function" "rolodex_utilitor_function" {
  function_name = "rolodex_utilitor_function"
  role          = aws_iam_role.rolodex_utilitor_lambda_role.arn
  handler       = "presigned.main"
  runtime       = "provided.al2023"

  # Workaround to avoid needing to set filename in this repo
  filename = "../server.zip"
  lifecycle {
    ignore_changes = [
      filename,
      environment.0.variables["CLIENT_ID"],
      environment.0.variables["CLIENT_SECRET"],
    ]
  }

  environment {
    variables = {
      "GIN_MODE" = "release"
    }
  }


}
