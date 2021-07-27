import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { log } from "./middlewares/loggingMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});

const hello = ({ response }) => {
  response.body = "Hello world!";
};

app.use(log);
app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;