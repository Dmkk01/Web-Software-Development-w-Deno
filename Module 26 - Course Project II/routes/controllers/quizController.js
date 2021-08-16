import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const getRandomQuestion = async ({ response, render,  user }) => {
    const res = await questionService.getRandomQuestion();
    
    if (!res) {
        render('quiz.eta')
    }
    else {
        const questionID = res.id
        response.redirect(`/quiz/${questionID}`);
    }   
};

const showQuizQuestion = async ({ response,  render, params }) => {
    const data = {
        question: await questionService.getQuestion(params.id),
        options: await optionService.getOptions(params.id)
    }
    render('quiz.eta', data)
};


const submitQuestion = async ({ response,  render, params, user }) => {
    const user_id = user.id;
    const questionID = params.id
    const optionId = params.optionId
    const opt = await optionService.getOptionByID(optionId);
    await quizService.addQuestionAnswer(user_id, questionID, optionId, opt.is_correct);
    if (opt.is_correct) {
        response.redirect(`/quiz/${questionID}/correct`);
        return;
    }
    else {
        response.redirect(`/quiz/${questionID}/incorrect`);
        return;
    }
};

const correctAnswer = async ({ render }) => {
    const data = {
        message: 'Correct!'
    }
    render('answer.eta', data)
};

const wrongAnswer = async ({render, params }) => {
    const questionID = params.id
    const res = await optionService.getOptions(questionID);

    const data = {
        correct: res.find(x => x.is_correct == true).option_text,
        message: 'Incorrect!'
    }
    render('answer.eta', data)
};

export { getRandomQuestion, showQuizQuestion, submitQuestion, correctAnswer, wrongAnswer};