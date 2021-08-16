import * as statisticsService from "../../services/statisticsService.js";

const showStats = async ({response, render, user }) => {
    const data = {}
    data.fiveMost = await statisticsService.selectFiveMost();
    
    const userAnswers = await statisticsService.totalUserQuestions(user.id)
    const correct = userAnswers.filter(x => x.correct == true)
    data.correct = correct.length
    data.answers = userAnswers.length
    data.user = user.id
    

    const allQuestions = await statisticsService.selectAllQuestions(user.id)
    const myQuestions = {
        correct: 0,
        all: 0,
    }
    for (let i = 0; i < allQuestions.length; i++) {
        const result = await statisticsService.selectAnswers(allQuestions[i].id)
        myQuestions.correct += result.filter(x => x.correct == true).length
        myQuestions.all += result.length
    }
    data.myQuestion = myQuestions

    render("statistics.eta", data);
};

export { showStats };