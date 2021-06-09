/* Replace with your SQL commands */
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar(100),
  "lastname" varchar(100),
  "email" varchar(100) UNIQUE,
  "phone" varchar(100),
  "password" varchar(60),
  "confirm_password" varchar(60),
  "role_id" INT,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);