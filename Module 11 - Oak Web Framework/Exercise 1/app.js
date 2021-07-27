import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});

const greet = (context) => {
  context.response.body = "I am learning to write web applications!";
};

app.use(greet);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;