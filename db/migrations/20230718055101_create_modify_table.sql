-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE users ADD profile_image VARCHAR(1000) NULL;
ALTER TABLE orders CHANGE  store_activty_id store_activity_id INT NOT NULL;
ALTER TABLE orders
ADD FOREIGN KEY (store_activity_id) REFERENCES store_activities(id);
SET FOREIGN_KEY_CHECKS = 1;

-- migrate:down

