-- migrate:up
 ALTER TABLE likes
ADD COLUMN target_id INT NOT NULL;


-- migrate:down

