const getQuestions = `
SELECT * FROM questions
`;
const getAllAnswers = `
SELECT answers FROM questions
`;

const addQuestionsQuery = `
INSERT INTO 
  questions( question_number, question_text, answers, correct_answer
  ) 
VALUES ($1,$2,$3,$4) RETURNING id, question_number,question_text, answers, correct_answer`;

const findQuestionsById = `
SELECT 
    id, question_number, question_text, answers, correct_answer FROM questions WHERE id=$1
`;

const updateQuestionsQuery = `
UPDATE questions SET question_number=$1, question_text=$2, answers=$3, correct_answer=$4, created_at=NOW(), updated_at=NOW() WHERE id=$5
RETURNING 
    question_number, question_text, answers, correct_answer, created_at, updated_at`;

const deleteQuestionsQuery = `
DELETE FROM questions WHERE id=$1`;

module.exports = {
  getQuestions,
  getAllAnswers,
  findQuestionsById,
  updateQuestionsQuery,
  deleteQuestionsQuery,
  addQuestionsQuery,
};
