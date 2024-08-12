resource "aws_cloudwatch_log_group" "rolodex_utilitor_function" {
  name              = "/aws/lambda/${aws_lambda_function.rolodex_utilitor_function.function_name}"
  retention_in_days = 3
  lifecycle {
    prevent_destroy = false
  }
}
