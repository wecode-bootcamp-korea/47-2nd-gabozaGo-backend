-- migrate:up
ALTER TABLE users
MODIFY COLUMN profile_image VARCHAR(1000);

-- migrate:down

