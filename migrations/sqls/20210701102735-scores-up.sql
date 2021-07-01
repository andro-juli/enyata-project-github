/* Replace with your SQL commands */
CREATE TABLE "scores" (
    "id" SERIAL PRIMARY KEY,
    "score" varchar(60),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);