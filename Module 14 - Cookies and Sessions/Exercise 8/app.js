import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});

new OakSession(app);
app.use(renderMiddleware);

const router = new Router();


const showData = async ({ state, render }) => {
  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }

  render("index.eta", { items: items });
};

const addData = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }
  items.push(params.get("item"));
  await state.session.set("items", items);

  response.redirect("/");
};

router.get("/", showData);
router.post("/", addData)

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
