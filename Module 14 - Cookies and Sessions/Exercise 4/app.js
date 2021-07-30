import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
new OakSession(app);

const hello = async (context) => {
  let count = await context.state.session.get("count");
  if (!count) {
    count = 1;
  }
  await context.state.session.set("count", Number(count) + 1);

  context.response.body = `${count}`;
};

app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
