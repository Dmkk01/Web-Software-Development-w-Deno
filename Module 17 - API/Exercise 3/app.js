import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const secret = ({ response, params }) => {
  response.body = {
    secret: params.secret,
  };
};

router.get("/secret/:secret", secret);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;