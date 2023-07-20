                -- migrate:up
CREATE TABLE stores (
    id INT NOT NULL AUTO_INCREMENT,
    activity_id INT NOT NULL,
    spot_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(1000) NOT NULL,
    post_number VARCHAR(10) NOT NULL,
    city VARCHAR(1000) NOT NULL,
    district VARCHAR(1000) NOT NULL,
    detail_address VARCHAR(1000) NOT NULL,
    description VARCHAR(1000) NULL,
    business_logo VARCHAR(1000) NULL,
    PRIMARY KEY(id)
);

-- migrate:down             
DROP TABLE stores;
