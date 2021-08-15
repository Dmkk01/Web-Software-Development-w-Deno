import { executeQuery } from "../database/database.js";

const selectFiveMost = async () => {
    const res = await executeQuery(`SELECT users.email as email, count(*) as count FROM users
                                    JOIN question_answers ON users.id = question_answers.user_id
                                    WHERE question_answers.correct = true
                                    GROUP BY users.email
                                    ORDER BY count DESC
                                    LIMIT 5`)

    return res.rows;
};

const totalUserQuestions = async (userID) => {
    const res = await executeQuery(`SELECT * FROM question_answers WHERE user_id = $1`, userID)
    return res.rows;
}

const selectAllQuestions = async (userID) => {
    const res = await executeQuery(`SELECT id FROM questions WHERE questions.user_id = $1`, userID)
    return res.rows
}

const selectAnswers = async (questionID) => {
    const res = await executeQuery(`SELECT * FROM question_answers WHERE question_id = $1`, questionID)
    return res.rows
}


export { selectFiveMost, totalUserQuestions, selectAllQuestions, selectAnswers };