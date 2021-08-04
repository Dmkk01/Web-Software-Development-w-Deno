import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { fetchRandomJoke } from "./services/jokeService.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
app.use(errorMiddleware);
app.use(renderMiddleware);

const router = new Router();

const showPage = async ({ render }) => {
  const data = await fetchRandomJoke();
  render("index.eta", data);
};

router.get("/", showPage);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
