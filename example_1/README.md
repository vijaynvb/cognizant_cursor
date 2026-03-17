# Order Management System - Database Scripts

Database schema derived from the UML class diagram for Order, Order Line, Customer, Corporate Customer, and Personal Customer entities.

## Schema Overview

| Table | Description |
|-------|-------------|
| `customers` | Base customer table (Name, Address, Credit Rating) |
| `corporate_customers` | Corporate subtype (Contact Name, Credit Rating, Credit Limit) |
| `personal_customers` | Personal subtype (Credit Card ID) |
| `orders` | Order header (Number, Date Received, isPrepaid, Price, Dispatch/Close) |
| `order_lines` | Order line items (Product, Quantity, Price) |

## Inheritance Strategy

**Joined Table Inheritance** is used for the Customer hierarchy:
- `customers` holds common attributes and a `customer_type` discriminator
- `corporate_customers` and `personal_customers` extend via `customer_id` FK
- Each customer row exists in exactly one subtype table

## Relationships

- **Order → Customer**: Many-to-one (`orders.customer_id` → `customers.id`)
- **Order → Order Line**: One-to-many (`order_lines.order_id` → `orders.id`)

## Usage

```bash
# Create tables
psql -U your_user -d your_db -f 001_create_tables.sql

# Rollback
psql -U your_user -d your_db -f 002_drop_tables.sql
```

## Requirements

- PostgreSQL 12+ (for `gen_random_uuid()`)
