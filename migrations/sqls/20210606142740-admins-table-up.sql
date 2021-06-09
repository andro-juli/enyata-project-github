/* Replace with your SQL commands */
CREATE TABLE "admins" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "email" varchar(100) UNIQUE,
  "password" varchar(60),
  "phone" varchar(100),
  "country" varchar(100),
  "address" varchar(100),
  "image_url" varchar(225),
  "role_id" INT,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);