-- migrate:up
ALTER TABLE stores DROP FOREIGN KEY stores_ibfk_6;
ALTER TABLE stores DROP COLUMN activity_id;

-- migrate:down

