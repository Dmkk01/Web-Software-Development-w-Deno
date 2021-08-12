import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as multiQuestionController from "./controllers/multiQuestionController.js";
import * as singleQuestionController from "./controllers/singleQuestionController.js";

const router = new Router();

router.get("/", multiQuestionController.redirectRoot);
router.get("/questions", multiQuestionController.getAllQuestions);
router.post("/questions", multiQuestionController.addQuestion);

router.get("/questions/:id", singleQuestionController.getQuestion);
router.post("/questions/:id/delete", singleQuestionController.deleteQuestion);
router.post("/questions/:id/options", singleQuestionController.addOption);
router.post("/questions/:id/options/:optionID/delete", singleQuestionController.deleteOption);


export { router };