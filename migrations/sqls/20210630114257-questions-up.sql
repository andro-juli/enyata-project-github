/* Replace with your SQL commands */
CREATE TABLE "questions" (
    "id" SERIAL PRIMARY KEY,
    "question_number" numeric,
    "question_text" varchar(400),
    "answera" varchar(100),
    "answerb" varchar(100),
    "answerc" varchar(100),
    "answerd" varchar(100),
    "correct_answer" varchar(255),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);