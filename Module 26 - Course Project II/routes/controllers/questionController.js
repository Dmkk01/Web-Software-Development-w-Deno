import * as questionService from "../../services/questionService.js";

const redirectRoot = async ({response}) => {
    response.redirect("/questions");
} 

const getData = () => {
    return {
        error: '',
        title: '',
        question_text: '',
    }
}

const getAllQuestions = async ({ render }) => {
    const data = getData()
    data.questions = await questionService.getAllQuestions()
    render("questions.eta", data);
};

const addQuestion = async ({request, render}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;


    const title = params.get("title");
    const question_text = params.get("question_text")

    const data = getData()

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

const getQuestion = async ({ render, params, response }) => {
    response.body = await questionService.getQuestion(params.id);
};
  
  export { getAllQuestions, addQuestion, redirectRoot, getQuestion };