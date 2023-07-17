-- migrate:up
CREATE TABLE user_spots (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    spot_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE user_spots;
