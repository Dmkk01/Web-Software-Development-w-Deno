import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const showSum = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  const sum = Number(params.get("first")) + Number(params.get("second"));
  response.body = sum;
};

const viewForm = ({ render }) => {
  render("index.eta");
};

router.post("/", showSum);
router.get("/", viewForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;