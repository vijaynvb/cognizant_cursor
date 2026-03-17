# Order Management System - Terraform Outputs

output "db_endpoint" {
  description = "RDS PostgreSQL endpoint (hostname)"
  value       = aws_db_instance.main.address
}

output "db_port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.main.port
}

output "db_name" {
  description = "Database name"
  value       = aws_db_instance.main.db_name
}

output "connection_string" {
  description = "PostgreSQL connection string (password redacted)"
  value       = "postgresql://${aws_db_instance.main.username}:***@${aws_db_instance.main.address}:${aws_db_instance.main.port}/${aws_db_instance.main.db_name}"
  sensitive   = true
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "Private subnet IDs for RDS"
  value       = aws_subnet.private[*].id
}

output "rds_arn" {
  description = "ARN of the RDS instance"
  value       = aws_db_instance.main.arn
}
