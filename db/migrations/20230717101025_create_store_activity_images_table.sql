-- migrate:up
CREATE TABLE store_activity_images (
    id INT NOT NULL AUTO_INCREMENT,
    store_activity_id INT NOT NULL,
    image VARCHAR(1000) NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE store_activity_images;