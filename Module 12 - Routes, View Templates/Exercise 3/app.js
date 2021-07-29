import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const getMsg = ({ response }) => {
  response.body = "GET request";
};

const postMsg = ({ response }) => {
  response.body = "POST request";
};

const putMsg = ({ response }) => {
  response.body = "PUT request";
};

router.get("/", getMsg);
router.post("/", postMsg);
router.put("/", putMsg);

app.use(errorMiddleware);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;