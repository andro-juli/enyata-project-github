/* Replace with your SQL commands */
CREATE TABLE "applications" (
  "id" SERIAL PRIMARY KEY,
  "batch_id" varchar(100),
  "link" varchar(255),
  "instructions" varchar(255),
  "file_url" varchar(255),
  "app_closure_date" varchar(255),
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);