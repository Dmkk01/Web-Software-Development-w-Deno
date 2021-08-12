import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const redirectRoot = async ({response}) => {
    response.redirect("/questions");
} 


// All Questions
const getQuestionsData = () => {
    return {
        error: '',
        title: '',
        question_text: '',
    }
}

const getAllQuestions = async ({ render }) => {
    const data = getQuestionsData()
    data.questions = await questionService.getAllQuestions()
    render("questions.eta", data);
};

const addQuestion = async ({request, render}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;


    const title = params.get("title");
    const question_text = params.get("question_text")

    const data = getQuestionsData()

    if (title.length < 1 || question_text.length < 1) {
        data.error = 'Both inputs need to be at least 1 character long!';
        data.title = title;
        data.question_text = question_text
        data.questions = await questionService.getAllQuestions()
        render("questions.eta", data);
    }
    else {
        await questionService.addQuestion(1, title, question_text);
        data.questions = await questionService.getAllQuestions()
        render("questions.eta", data);
    }
}

// Single Question

const getSingleQuestionData = () => {
    return {
        error: '',
        option_text: ''
    }
}
const getQuestion = async ({ render, params, response }) => {

    const data = getSingleQuestionData()
    data.question = await questionService.getQuestion(params.id);
    data.options = await optionService.getOptions(params.id);

    render('question.eta', data)
};

const addOption = async ({ render, response, request, params }) => {
    const body = request.body({ type: "form" });
    const parameters = await body.value;

    const option_text = parameters.get("option_text");
    const is_correct = parameters.get("is_correct")

    const data = getSingleQuestionData()

    if (option_text.length < 1) {
        data.error = 'The input needs to be at least 1 character long!';
        data.option_text = option_text
        data.question = await questionService.getQuestion(params.id);
        data.options = await optionService.getOptions(params.id);

        render("question.eta", data);
    }
    else {
        await optionService.addOption(params.id, option_text, is_correct ? true : false);
        response.redirect(`/questions/${params.id}`)
    }
};
  
export { getAllQuestions, addQuestion, redirectRoot, getQuestion, addOption };