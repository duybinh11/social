DELETE FROM tweets WHERE scheduled_date IS NOT NULL;

ALTER TABLE tweets DROP COLUMN scheduled_date;
