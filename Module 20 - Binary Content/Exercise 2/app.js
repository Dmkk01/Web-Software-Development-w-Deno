import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta");
};

const processUpload = async ({ request, response }) => {
  const body = request.body({ type: "form-data" });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];

  response.body = fileDetails.contentType;
};

router.get("/", showForm);
router.post("/", processUpload);

app.use(router.routes());
app.listen({ port: 7777 });