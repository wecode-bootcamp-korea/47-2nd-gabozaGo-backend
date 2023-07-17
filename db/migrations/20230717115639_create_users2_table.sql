-- migrate:up
ALTER TABLE users ADD CONSTRAINT uc_social_platform UNIQUE (social_platform, social_platform_id);
ALTER TABLE orders MODIFY COLUMN order_number VARCHAR(500) NOT NULL;

-- migrate:down


