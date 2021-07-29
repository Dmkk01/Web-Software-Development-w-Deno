import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const getData = (params) => {
  let name = "Batman";
  if (params && params.name) {
    name = params.name;
  }

  let emotion = "tired";
  if (params && params.emotion) {
    emotion = params.emotion;
  }

  return {
    name: name,
    emotion: emotion,
  };
};

const viewStoryWithContent = ({ params, render }) => {
  render("index.eta", getData(params));
};

const viewStory = ({ render }) => {
  render("index.eta", getData());
};

router.get("/name/:name/emotion/:emotion", viewStoryWithContent);
router.get("/", viewStory);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;