import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
new OakSession(app);

const router = new Router();

const showData = async ({ state, render, response }) => {
  let name = await state.session.get("name");
  if (!name) {
    name = 'anonymous';
  }
  response.body = `Hello ${name}!`;
};

const addData = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  let name = await state.session.get("items");
  if (!name) {
    name = 'anonymous';
  }
  name = (params.get("name"));
  await state.session.set("name", name);

  response.redirect("/");
};

router.get("/", showData);
router.post("/", addData);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
