import { executeQuery } from "../database/database.js";

const getAllQuestions = async () => {
    const res = await executeQuery('SELECT * FROM questions')
    return res.rows;
}

const addQuestion = async (userId, title, text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    userId,
    title,
    text,
  );
};

const getQuestion = async (questionID) => {
    const res = await executeQuery('SELECT * FROM questions WHERE id = $1', questionID);
    return res.rows[0];
}

const deleteQuestion = async (questionID) => {
  await executeQuery('DELETE FROM questions WHERE id = $1', questionID);
}

export { getAllQuestions, addQuestion, getQuestion, deleteQuestion };