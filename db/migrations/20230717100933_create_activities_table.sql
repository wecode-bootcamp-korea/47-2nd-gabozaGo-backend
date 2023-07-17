-- migrate:up
CREATE TABLE activities (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE activities;
