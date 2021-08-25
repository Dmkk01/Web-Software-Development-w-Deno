import { executeQuery } from "../database/database.js";

const getAllQuestions = async (userID) => {
    const res = await executeQuery('SELECT * FROM questions WHERE user_id = $1', userID)
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

const getRandomQuestion = async () => {
  const res = await executeQuery('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1 ');
  if (res.rows.length === 0 ) {
    return []
  }
  else {
    return res.rows[0];
  }
}

const deleteQuestion = async (questionID) => {
  await executeQuery('DELETE FROM questions WHERE id = $1', questionID);
}



export { getAllQuestions, addQuestion, getQuestion, deleteQuestion, getRandomQuestion };