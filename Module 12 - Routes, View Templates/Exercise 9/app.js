import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

let message = "Yes";

const msg = ({ response }) => {
  response.body = message;

  if (message === "Yes") {
    message = "No";
  } else {
    message = "Yes";
  }
};

router.get("/", msg);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;