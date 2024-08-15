resource "aws_cognito_user_pool" "rolodex-utilitor" {
  name = "rolodex-utilitor"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length                   = 6
    require_numbers                  = true
    temporary_password_validity_days = 7
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  #   email_configuration {
  #     email_sending_account = "DEVELOPER"
  #     from_email_address    = "verification@easycontactform.dev"
  #     source_arn            = aws_ses_domain_identity.easy_contact_ses_domain_identity.arn
  #   }
}

# resource "aws_cognito_user_pool_domain" "easy_form_user_pool_domain" {
#   domain          = aws_acm_certificate.login_cert.domain_name
#   certificate_arn = aws_acm_certificate.login_cert.arn
#   user_pool_id    = aws_cognito_user_pool.easy_form_user_pool.id
# }

resource "aws_cognito_user_pool_domain" "rolodex-utilitor" {
  domain       = aws_cognito_user_pool.rolodex-utilitor.name
  user_pool_id = aws_cognito_user_pool.rolodex-utilitor.id
}


resource "aws_cognito_user_pool_client" "rolodex-utilitor_pool_client" {
  name                                 = "rolodex-utilitor_pool_client"
  user_pool_id                         = aws_cognito_user_pool.rolodex-utilitor.id
  callback_urls                        = ["https://d12si818kne643.cloudfront.net/login", "http://localhost:3000/login"]
  logout_urls                          = ["https://d12si818kne643.cloudfront.net/logout", "http://localhost:3000/logout"]
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid"]
  allowed_oauth_flows_user_pool_client = true
  generate_secret                      = true

  token_validity_units {
    access_token = "days"
  }

}
