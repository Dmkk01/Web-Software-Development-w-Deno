import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();
new OakSession(app);

const showStatus = async ({ response, state }) => {
  if (await state.session.get("authenticated")) {
    response.body = "Authenticated";
  } else {
    response.body = "Not authenticated";
  }
};

const authenticate = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const username = params.get("username");
  const password = params.get("password");

  if (username === "Minuteman" && password === "00000000") {
    await state.session.set("authenticated", true);
    response.redirect("/");
  } else {
    response.status = 401;
  }
};

router.get("/", showStatus);
router.post("/", authenticate);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;