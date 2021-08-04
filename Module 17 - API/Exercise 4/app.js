import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const mirrorRequest = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  response.body = await body.value;
};

router.post("/", mirrorRequest);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;