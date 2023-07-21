-- migrate:up
ALTER TABLE users MODIFY COLUMN social_platform VARCHAR(50) NULL;
ALTER TABLE users MODIFY COLUMN phone_number VARCHAR(1000) NULL;

-- migrate:down

