/* Replace with your SQL commands */
CREATE TABLE "cv" (
  "id" SERIAL PRIMARY KEY,
  "avatar" varchar(255),
  "cloudinary_id" varchar(255),
  "role_id" INT,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);