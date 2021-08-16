import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const getRandomQuestion = async ({ response, render,  user }) => {
    const res = await questionService.getRandomQuestion();
    
    if (!res) {
        render('quiz.eta', {user: user.id})
    }
    else {
        const questionID = res.id
        response.redirect(`/quiz/${questionID}`);
    }   
};

const showQuizQuestion = async ({ response,  render, params, user }) => {
    const data = {
        question: await questionService.getQuestion(params.id),
        options: await optionService.getOptions(params.id),
        user: user.id
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

const correctAnswer = async ({ render, user }) => {
    const data = {
        message: 'Correct!',
        user: user.id
    }
    render('answer.eta', data)
};

const wrongAnswer = async ({render, params, user }) => {
    const questionID = params.id
    const res = await optionService.getOptions(questionID);

    const data = {
        message: 'Incorrect!',
        user: user.id
    }
    const correctAnswer = res.find(x => x.is_correct == true);
    
    if (!correctAnswer) {
        data.correct = ''
    }
    else {
        data.correct = correctAnswer.option_text
    }
     
    render('answer.eta', data)
};

export { getRandomQuestion, showQuizQuestion, submitQuestion, correctAnswer, wrongAnswer};