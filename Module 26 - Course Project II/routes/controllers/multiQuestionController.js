import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const redirectRoot = async ({response}) => {
    response.redirect("/auth/login");
} 

const getQuestionsData = () => {
    return {
        error: '',
        title: '',
        question_text: '',
    }
}

const getAllQuestions = async ({ render, user }) => {
    const data = getQuestionsData()
    data.questions = await questionService.getAllQuestions(user.id);
    render("questions.eta", data);
};

const addQuestion = async ({request, render, user}) => {
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
        await questionService.addQuestion(user.id, title, question_text);
        data.questions = await questionService.getAllQuestions(user.id)
        render("questions.eta", data);
    }
}

  
export { getAllQuestions, addQuestion, redirectRoot};