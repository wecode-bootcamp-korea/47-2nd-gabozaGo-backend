-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    social_platform VARCHAR(50) NOT NULL,
    social_platform_id BIGINT NOT NULL,
    phone_number VARCHAR(1000) NOT NULL,
    point DECIMAL(10,2) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE users;
