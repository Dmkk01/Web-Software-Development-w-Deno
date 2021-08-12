import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


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

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.id);
    response.redirect("/questions");
};

const deleteOption = async ({ params, response }) => {
    await optionService.deleteOption(params.id, params.optionID);
    response.redirect(`/questions/${params.id}`)
};
  
export {getQuestion, addOption, deleteQuestion, deleteOption };