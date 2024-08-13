resource "aws_lambda_permission" "rolodex_utilitor_handler_lambda_permission" {
  statement_id  = "AllowFormSubmitAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "rolodex_utilitor_function"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.execution_arn}/*"
}

resource "aws_api_gateway_rest_api" "rolodex_utilitor_handler_api_gateway" {
  name = "rolodex_utilitor_handler_api_gateway"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "rolodex_utilitor_handler_api_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "rolodex_utilitor_handler_api_gateway_method_post" {
  rest_api_id   = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id   = aws_api_gateway_resource.rolodex_utilitor_handler_api_gateway_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "rolodex_utilitor_handler_integration_post" {
  rest_api_id             = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id             = aws_api_gateway_resource.rolodex_utilitor_handler_api_gateway_resource.id
  http_method             = aws_api_gateway_method.rolodex_utilitor_handler_api_gateway_method_post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.rolodex_utilitor_function.invoke_arn
}

resource "aws_api_gateway_method" "rolodex_utilitor_handler_api_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id   = aws_api_gateway_resource.rolodex_utilitor_handler_api_gateway_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "rolodex_utilitor_handler_integration" {
  rest_api_id             = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id             = aws_api_gateway_resource.rolodex_utilitor_handler_api_gateway_resource.id
  http_method             = aws_api_gateway_method.rolodex_utilitor_handler_api_gateway_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.rolodex_utilitor_function.invoke_arn
}

# resource "aws_api_gateway_base_path_mapping" "rolodex_utilitor_handler_gateway_mapping" {
#   api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
#     domain_name = aws_api_gateway_domain_name.easy_form_members_api_gateway_domain.domain_name
#   stage_name = "deployed"
#   base_path  = "forms"
# }

# resource "aws_api_gateway_base_path_mapping" "easy_form_webhook_handler_gateway_mapping" {
#   api_id      = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
#   domain_name = aws_api_gateway_domain_name.easy_form_members_api_gateway_domain.domain_name
#   stage_name  = "deployed"
#   base_path   = "webhook"
# }

resource "aws_api_gateway_deployment" "rolodex_utilitor_handler_api_gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id

  stage_name        = "deployed"
  stage_description = "Deployed at ${timestamp()}"

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

####################################################
# UNPROTECTED CORS
####################################################

resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id   = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.root_resource_id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.root_resource_id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = 200
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
  depends_on = [aws_api_gateway_method.options_method]
}

resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.root_resource_id
  http_method = aws_api_gateway_method.options_method.http_method
  type        = "MOCK"
  depends_on  = [aws_api_gateway_method.options_method]
  request_templates = {
    "application/json" = jsonencode(
      {
        statusCode = 200
      }
    )
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.id
  resource_id = aws_api_gateway_rest_api.rolodex_utilitor_handler_api_gateway.root_resource_id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = aws_api_gateway_method_response.options_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'*'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
  depends_on = [aws_api_gateway_method_response.options_200]
}
