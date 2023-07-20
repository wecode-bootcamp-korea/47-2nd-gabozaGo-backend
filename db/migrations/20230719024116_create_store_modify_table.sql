-- migrate:up
ALTER TABLE stores DROP FOREIGN KEY stores_ibfk_2;
ALTER TABLE stores DROP COLUMN activity_id;

-- migrate:down

