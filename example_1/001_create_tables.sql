-- Order Management System - Database Schema
-- Based on UML Class Diagram: Order, Order Line, Customer, Corporate Customer, Personal Customer
-- Uses Joined Table Inheritance for Customer hierarchy

-- =============================================================================
-- CUSTOMER HIERARCHY (Joined Table Inheritance)
-- =============================================================================

-- Base customer table (common attributes)
CREATE TABLE customers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    address         VARCHAR(500),
    credit_rating   VARCHAR(50),
    customer_type   VARCHAR(20) NOT NULL CHECK (customer_type IN ('corporate', 'personal')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Corporate customer (extends Customer)
CREATE TABLE corporate_customers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id     UUID NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
    contact_name    VARCHAR(255),
    credit_rating   VARCHAR(50),
    credit_limit    DECIMAL(15, 2),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Personal customer (extends Customer)
CREATE TABLE personal_customers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id     UUID NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
    credit_card_id  VARCHAR(100),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- ORDERS
-- =============================================================================

CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number          VARCHAR(50) NOT NULL UNIQUE,
    customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    date_received   DATE NOT NULL,
    is_prepaid      BOOLEAN NOT NULL DEFAULT false,
    price           DECIMAL(15, 2) NOT NULL,
    dispatch_date   TIMESTAMPTZ,
    close_date     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- ORDER LINES
-- =============================================================================

CREATE TABLE order_lines (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product         VARCHAR(255) NOT NULL,
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    price           DECIMAL(15, 2) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX idx_corporate_customers_customer_id ON corporate_customers(customer_id);
CREATE INDEX idx_personal_customers_customer_id ON personal_customers(customer_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_number ON orders(number);
CREATE INDEX idx_orders_date_received ON orders(date_received);
CREATE INDEX idx_order_lines_order_id ON order_lines(order_id);

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE customers IS 'Base customer entity; use customer_type to discriminate Corporate vs Personal';
COMMENT ON TABLE corporate_customers IS 'Corporate customer subtype with contact and credit limit';
COMMENT ON TABLE personal_customers IS 'Personal customer subtype with credit card reference';
COMMENT ON TABLE orders IS 'Order header with customer reference';
COMMENT ON TABLE order_lines IS 'Order line items linked to an order';
