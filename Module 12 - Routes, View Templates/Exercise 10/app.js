import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const message = (count) => {
  if (count === 3) {
    return "Three...";
  } else if (count === 2) {
    return "Two...";
  } else if (count === 1) {
    return "One...";
  }

  return "Liftoff!";
};

let count = 4;

const countdown = ({ response }) => {
  if (count > 0) {
    count--;
  }
  response.body = message(count);
};

router.get("/", countdown);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;