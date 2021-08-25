import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const getQuestionsData = (user) => {
    return {
        error: '',
        title: '',
        question_text: '',
        user: user,
    }
}

const getAllQuestions = async ({ render, user }) => {
    const data = getQuestionsData(user.id)
    data.questions = await questionService.getAllQuestions(user.id);
    render("questions.eta", data);
};

const addQuestion = async ({response, request, render, user}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const title = params.get("title");
    const question_text = params.get("question_text")

    const data = getQuestionsData(user.id)

    if (title.length < 1 || question_text.length < 1) {
        data.error = 'Both inputs need to be at least 1 character long!';
        data.title = title;
        data.question_text = question_text
        data.questions = await questionService.getAllQuestions()
        render("questions.eta", data);
    }
    else {
        await questionService.addQuestion(user.id, title, question_text);
        response.redirect('/questions')
    }
}

  
export { getAllQuestions, addQuestion};