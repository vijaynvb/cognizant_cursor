-- Order Management System - Rollback Script
-- Drops tables in reverse dependency order

DROP TABLE IF EXISTS order_lines;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS personal_customers;
DROP TABLE IF EXISTS corporate_customers;
DROP TABLE IF EXISTS customers;
