import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
app.use(errorMiddleware);

new OakSession(app);

app.use(renderMiddleware);
app.use(async ({ request, response, state }, next) => {
  if (request.url.pathname.startsWith("/accounts")) {
    if (await state.session.get("authenticated")) {
      response.status = 200;
      await next();
    } else {
      response.status = 401;
    }
  } else {
    await next();
  }
});

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
