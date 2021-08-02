import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as authenticationController from "./controllers/authenticationController.js";
import * as mainController from "./controllers/mainController.js";
import * as accountsController from "./controllers/accountsController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", authenticationController.showRegistrationForm);
router.post("/auth/register", authenticationController.postRegistrationForm);
router.get("/auth/login", authenticationController.showLoginForm);
router.post("/auth/login", authenticationController.postLoginForm);
router.post("/accounts/:id/deposit", accountsController.depositMoney);
router.post("/accounts/:id/withdraw", accountsController.withdrawMoney);
router.get("/accounts/:id", accountsController.getAccount);
router.get("/accounts", accountsController.getAccounts);
router.post("/accounts", accountsController.postAccounts);

export { router };
