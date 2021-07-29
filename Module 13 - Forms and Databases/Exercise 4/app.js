import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import * as ticketService from "./services/ticketService.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const showTickets = async ({ render }) => {
  render("index.eta", { tickets: await ticketService.findAll() });
};

router.get("/tickets", showTickets);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
