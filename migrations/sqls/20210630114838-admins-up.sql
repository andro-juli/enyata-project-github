/* Replace with your SQL commands */
CREATE TABLE "admins" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255),
    "email" varchar(100) UNIQUE,
    "password" varchar(100),
    "phone" varchar(100),
    "country" varchar(100),
    "address" varchar(100),
    "image_url" varchar,
    "role_id" INT,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);