-- migrate:up
CREATE TABLE store_activity_reviews (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_activity_id INT NOT NULL,
    score DECIMAL(10,2) NOT NULL,
    description VARCHAR(1000) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE store_activity_reviews;
