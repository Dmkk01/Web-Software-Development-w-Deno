import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const message = ({ response }) => {
  response.body = "Postman Pat!";
};

router.post("/", message);

app.use(errorMiddleware);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;