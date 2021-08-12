import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as questionController from "./controllers/questionController.js";

const router = new Router();

router.get("/", questionController.redirectRoot);
router.get("/questions", questionController.getAllQuestions);
router.post("/questions", questionController.addQuestion);

router.get("/questions/:id", questionController.getQuestion);
router.post("/questions/:id/options", questionController.addOption);

export { router };