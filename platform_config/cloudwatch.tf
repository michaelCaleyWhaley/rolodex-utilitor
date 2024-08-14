resource "aws_cloudwatch_log_group" "rolodex_utilitor_function" {
  name              = "/aws/lambda/${aws_lambda_function.rolodex_utilitor_function.function_name}"
  retention_in_days = 3
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_log_group" "rolodex_utilitor_api_gateway" {
  name              = "/aws/apigateway/${aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.name}"
  retention_in_days = 3
  lifecycle {
    prevent_destroy = false
  }
}
