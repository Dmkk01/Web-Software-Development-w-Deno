import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();
new OakSession(app);

app.use(renderMiddleware);

const postForm = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const password = params.get("password");

  if (password === "hippopotamus") {
    await state.session.set("authenticated", true);
    response.body = "Authentication successful.";
  } else {
    response.body = "Wrong password.";
  }
};

const showMain = async ({ render, state }) => {
  const authenticated = await state.session.get("authenticated");

  if (authenticated) {
    render("secret.eta");
  } else {
    render("index.eta");
  }
};

router.get("/", showMain);
router.post("/", postForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;