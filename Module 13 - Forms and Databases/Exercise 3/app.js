import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const getData = async (request) => {
  let params = new URLSearchParams();
  if (request) {
    const body = request.body();
    params = await body.value;
  }

  let name = "Batman";
  if (params.has("name")) {
    name = params.get("name");
  }

  let emotion = "tired";
  if (params.has("emotion")) {
    emotion = params.get("emotion");
  }

  return {
    name: name,
    emotion: emotion,
  };
};

const submitForm = async ({ request, render }) => {
  const data = await getData(request);
  render("index.eta", data);
};

const viewForm = async ({ render }) => {
  const data = await getData();
  render("index.eta", data);
};

router.post("/", submitForm);
router.get("/", viewForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;