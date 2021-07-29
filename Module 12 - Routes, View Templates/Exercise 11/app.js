import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const names = ({ response }) => {
  response.body = "Hello names!";
};

const redirectToNames = ({ response }) => {
  response.redirect("/names");
};

router.get("/", redirectToNames);
router.get("/names", names);
router.post("/names", redirectToNames);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;