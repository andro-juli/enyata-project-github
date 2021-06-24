/* Replace with your SQL commands */
CREATE TABLE "forms" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar(255),
  "lastname" varchar(255),
  "email" varchar(255),
  "dob" varchar(255),
  "address" varchar(255),
  "university" varchar(255),
  "program" varchar(255),
  "cgpa" numeric,
  "user_id" INT,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);