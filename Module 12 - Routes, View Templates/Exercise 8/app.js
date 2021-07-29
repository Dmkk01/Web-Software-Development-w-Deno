import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});

app.use(errorMiddleware);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
