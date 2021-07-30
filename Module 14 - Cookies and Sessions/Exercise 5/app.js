import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
new OakSession(app);

const greeting = async ({ state, response }) => {
  let knownUser = await state.session.get("known-user");
  if (!knownUser) {
    response.body = "Welcome stranger!";
  } else {
    response.body = "Hi again!";
  }

  await state.session.set("known-user", true);
};

app.use(greeting);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;