-- migrate:up
ALTER TABLE users
ADD COLUMN signup_status BOOLEAN DEFAULT false;


-- migrate:down

