import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});

const hello = ({ cookies, response }) => {
  let secret = "undefined";
  if (cookies.get("secret")) {
    secret = cookies.get("secret");
  }

  response.body = `The secret is ${secret}`;
};

app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;