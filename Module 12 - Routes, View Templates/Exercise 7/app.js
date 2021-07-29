import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const sum = ({ request, response }) => {
  const params = request.url.searchParams;
  if (params.has("number1") && params.has("number2")) {
    response.body = `${Number(params.get("number1")) + Number(params.get("number2"))}`;
  } else {
    response.body = "Invalid parameters.";
  }
};

router.get("/", sum);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;