import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import {
  isNumeric,
  minLength,
  required,
  numberBetween,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
  name: [required, minLength(4)],
  email: [required, isNumeric, numberBetween(1900, 2000)],
};

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta");
};

const getData = async (request) => {
  const data = {
    name: "",
    yearOfBirth: "",
    errors: null, // or errors: {}
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
    data.yearOfBirth = params.get("yearOfBirth");
  }

  return data;
};

const submitForm = async ({ request, response, render }) => {
  const data = await getData(request);
  const [passes, errors] = await validate(data, validationRules);
  if (!passes) {
    data.errors = errors;
    render("index.eta", data);
  } else {
    response.redirect("/");
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
