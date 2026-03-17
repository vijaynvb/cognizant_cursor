# Order Management System - Terraform IaC

Infrastructure as Code for provisioning AWS RDS PostgreSQL to host the Order Management System database schema (see `example_1/`).

## Architecture

| Resource | Description |
|----------|-------------|
| **VPC** | Isolated network with public and private subnets across 2 AZs |
| **RDS PostgreSQL** | Managed database (v16) in private subnets |
| **Security Group** | Restricts DB access to VPC CIDR |

## Prerequisites

- [Terraform](https://www.terraform.io/downloads) >= 1.0
- AWS CLI configured with credentials
- Sufficient IAM permissions for VPC, RDS, and EC2 (security groups)

## Quick Start

```bash
cd example_2

# Initialize Terraform
terraform init

# Copy and edit variables (set db_username and db_password)
cp terraform.tfvars.example terraform.tfvars

# Plan
terraform plan

# Apply
terraform apply
```

## Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `db_username` | Yes | - | Master database username |
| `db_password` | Yes | - | Master database password |
| `project_name` | No | `order-mgmt` | Resource naming prefix |
| `environment` | No | `dev` | dev, staging, or production |
| `aws_region` | No | `us-east-1` | AWS region |
| `db_instance_class` | No | `db.t3.micro` | RDS instance type |
| `db_publicly_accessible` | No | `false` | Allow public DB access |

Pass sensitive variables via environment:

```bash
export TF_VAR_db_username=admin
export TF_VAR_db_password="YourSecurePassword123!"
terraform apply
```

## Outputs

After `terraform apply`:

- `db_endpoint` – RDS hostname
- `db_port` – Port (5432)
- `db_name` – Database name
- `connection_string` – Connection string (sensitive)

## Apply Schema

After provisioning, run the schema from `example_1`:

```bash
psql "postgresql://$TF_VAR_db_username:$TF_VAR_db_password@$(terraform output -raw db_endpoint):5432/order_management" -f ../example_1/001_create_tables.sql
```

## Cleanup

```bash
terraform destroy
```
