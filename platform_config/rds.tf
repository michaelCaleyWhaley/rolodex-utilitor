# resource "aws_db_instance" "rolodex-postgres-db-instance" {
#   db_name           = "rolodex_db"
#   allocated_storage = 20
#   engine            = "postgres"
#   engine_version    = "16.3"
#   identifier        = "rolodex-postgres-db"
#   instance_class    = "db.t4g.micro"
#   #   postgress pw
#   password            = "postS1988"
#   skip_final_snapshot = true
#   storage_encrypted   = false
#   publicly_accessible = true
#   username            = "postgres"
#   apply_immediately   = true
# }
