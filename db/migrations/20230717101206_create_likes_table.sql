-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW() UNIQUE,
    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE likes;

