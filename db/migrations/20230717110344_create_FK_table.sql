-- migrate:up
ALTER TABLE user_spots
ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE user_activities
ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE store_activity_reviews
ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE likes
ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE user_spots
ADD FOREIGN KEY (spot_id) REFERENCES spots(id);
ALTER TABLE stores
ADD FOREIGN KEY (spot_id) REFERENCES spots(id);
ALTER TABLE user_activities
ADD FOREIGN KEY (activity_id) REFERENCES activities(id);
ALTER TABLE store_activities
ADD FOREIGN KEY (activity_id) REFERENCES activities(id);
ALTER TABLE stores
ADD FOREIGN KEY (activity_id) REFERENCES activities(id);
ALTER TABLE store_activity_images
ADD FOREIGN KEY (store_activity_id) REFERENCES store_activities(id);
ALTER TABLE store_activity_reviews
ADD FOREIGN KEY (store_activity_id) REFERENCES store_activities(id);
ALTER TABLE store_activities
ADD FOREIGN KEY (store_id) REFERENCES stores(id);
ALTER TABLE payments
ADD FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE store_activity_review_images
ADD FOREIGN KEY (store_activity_review_id) REFERENCES store_activity_reviews(id);

-- migrate:down

