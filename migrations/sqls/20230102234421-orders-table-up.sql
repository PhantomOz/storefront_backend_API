CREATE TABLE orders
(
    id SERIAL PRIMARY KEY,
    product_Id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id bigint REFERENCES users(id),
    status VARCHAR(255) DEFAULT 'active'
);