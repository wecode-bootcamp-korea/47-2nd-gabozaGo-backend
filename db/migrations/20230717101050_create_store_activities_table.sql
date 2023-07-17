-- migrate:up
CREATE TABLE store_activities (
    id INT NOT NULL AUTO_INCREMENT,
    store_id INT NOT NULL,
    activity_id INT NOT NULL,
    per_price DECIMAL(10,2) NOT NULL,
    max_head_count INT NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE store_activities;
