import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
new OakSession(app);

const paywall = async ({ state, response }) => {
  let visits = await state.session.get("visit-count");
  if (!visits) {
    visits = 1;
  }

  await state.session.set("visit-count", Number(visits) + 1);

  if (visits > 3) {
    response.body = "No more free truths. Payment required.";
  } else {
    response.body = "Welcome! Here are the truths that you are seeking for!";
  }
};

app.use(paywall);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;