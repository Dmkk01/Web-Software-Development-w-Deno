import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const getRandomQuestion = async ({ response }) => {
    const questionResponse = await questionService.getRandomQuestion();
    if (questionResponse.length === 0 ){
        response.body = {}
        return;
    }
    const optionResponse = await optionService.getOptions(questionResponse.id);

    for (let i = 0; i < optionResponse.length; i++) {
        delete optionResponse[i].question_id;
        delete optionResponse[i].is_correct;
        optionResponse[i].optionId = optionResponse[i].id;
        optionResponse[i].optionText = optionResponse[i].option_text;
        delete optionResponse[i].id;
        delete optionResponse[i].option_text;
      }

    const finalResponse = {
        questionId: questionResponse.id,
        questionTitle: questionResponse.title,
        questionText: questionResponse.question_text,
        answerOptions: optionResponse,
    }
    response.body = finalResponse  
};

const answerQuestion = async ({ response, request}) => {
    const body = request.body({ type: "json" });
    const content = await body.value;

    const optionId = content.optionId;
    const questionId = content.questionId;
    if(!optionId || !content.questionId) {
        response.body = {}
        return;
    }
    const question = await questionService.getQuestion(parseInt(questionId));
    const questionResponse = await optionService.getOptionByID(parseInt(optionId));

    if (!questionResponse || !question) {
        response.body = {}
        return;
    }
    const res = {
        correct: questionResponse.is_correct
    }
    response.body = res  
};

export { getRandomQuestion, answerQuestion};
