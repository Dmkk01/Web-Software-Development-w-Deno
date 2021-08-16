import {Router} from "../deps.js";
import * as multiQuestionController from "./controllers/multiQuestionController.js";
import * as singleQuestionController from "./controllers/singleQuestionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsApi from "./api/questionsApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", multiQuestionController.getAllQuestions);
router.post("/questions", multiQuestionController.addQuestion);

router.get("/questions/:id", singleQuestionController.getQuestion);
router.post("/questions/:id/delete", singleQuestionController.deleteQuestion);
router.post("/questions/:id/options", singleQuestionController.addOption);
router.post("/questions/:id/options/:optionID/delete", singleQuestionController.deleteOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:id", quizController.showQuizQuestion);
router.post("/quiz/:id/options/:optionId", quizController.submitQuestion);
router.get("/quiz/:id/correct", quizController.correctAnswer);
router.get("/quiz/:id/incorrect", quizController.wrongAnswer);

router.get( "/statistics", statisticsController.showStats);

router.get("/api/questions/random", questionsApi.getRandomQuestion);
router.post("/api/questions/answer", questionsApi.answerQuestion);


export { router };