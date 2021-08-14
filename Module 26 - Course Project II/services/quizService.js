import { executeQuery } from "../database/database.js";


const addQuestionAnswer = async (userID, questionID, optionID, correct) => {
    await executeQuery(
        `INSERT INTO question_answers  (user_id, question_id, question_answer_option_id, correct  ) VALUES ($1, $2, $3, $4)`,
        userID,
        questionID,
        optionID,
        correct
      );
}


export { addQuestionAnswer };