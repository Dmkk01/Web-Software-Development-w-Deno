import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const getSingleQuestionData = (user) => {
    return {
        error: '',
        option_text: '',
        user: user
    }
}
const getQuestion = async ({ render, params, user }) => {

    const data = getSingleQuestionData(user.id)
    data.question = await questionService.getQuestion(params.id);
    data.options = await optionService.getOptions(params.id);

    render('question.eta', data)
};

const addOption = async ({ render, response, request, params, user }) => {
    const body = request.body({ type: "form" });
    const parameters = await body.value;
    const userID = user.id;

    const currentQuestion = await questionService.getQuestion(params.id);

    if (userID != currentQuestion.user_id) {
        response.redirect('/questions');
        return;
    }

    const option_text = parameters.get("option_text");
    const is_correct = parameters.get("is_correct");

    const data = getSingleQuestionData(user.id);

    if (option_text.length < 1) {
        data.error = 'The input needs to be at least 1 character long!';
        data.option_text = option_text;
        data.question = currentQuestion;
        data.options = await optionService.getOptions(params.id);

        render("question.eta", data);
    }
    else {
        await optionService.addOption(params.id, option_text, is_correct ? true : false);
        response.redirect(`/questions/${params.id}`);
    }
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.id);
    response.redirect("/questions");
};

const deleteOption = async ({ params, response }) => {
    await optionService.deleteOption(params.id, params.optionID);
    response.redirect(`/questions/${params.id}`)
};
  
export {getQuestion, addOption, deleteQuestion, deleteOption };