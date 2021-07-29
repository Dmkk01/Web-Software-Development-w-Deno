import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as nameController from "./controllers/nameController.js";

const router = new Router();

router.get("/names", nameController.getNames)
  .post("/names", nameController.addName)

export { router };