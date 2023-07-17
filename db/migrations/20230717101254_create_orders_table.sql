-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    order_number INT NOT NULL,
    user_id INT NOT NULL,
    store_activty_id INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    head_count INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(100) NOT NULL,
    reservation_status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE store_activity_review_images;

