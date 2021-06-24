/* Replace with your SQL commands */
CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question_number" numeric,
  "question_text" varchar(255),
  "answers" varchar(255),
  "correct_answer" varchar(255),
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);