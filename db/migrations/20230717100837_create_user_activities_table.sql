-- migrate:up
CREATE TABLE user_activities (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE user_activities;