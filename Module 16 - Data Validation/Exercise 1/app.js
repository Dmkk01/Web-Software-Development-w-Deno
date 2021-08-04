import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta");
};

const submitForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  if (!params.has("name") || params.get("name").length < 4) {
    response.body = "Invalid name";
  } else if (!params.has("address") || params.get("address").length < 6) {
    response.body = "Invalid address";
  } else {
    response.body = "Ok!";
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;