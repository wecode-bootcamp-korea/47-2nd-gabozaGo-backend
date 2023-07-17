-- migrate:up
CREATE TABLE payments (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method_type VARCHAR(100) NOT NULL,
    amount_total DECIMAL(10,2) NOT NULL,
    approved_at TIMESTAMP NOT NULL DEFAULT NOW(),
    invoice JSON NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE payments;
