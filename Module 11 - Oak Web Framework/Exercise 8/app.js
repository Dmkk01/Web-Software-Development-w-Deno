import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { serveStaticFiles } from "./middlewares/serveStaticMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});

const hello = ({ response }) => {
  response.body = "Hello world!";
};

app.use(serveStaticFiles);
app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;