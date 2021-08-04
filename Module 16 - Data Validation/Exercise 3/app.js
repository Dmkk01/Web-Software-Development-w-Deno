import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { executeQuery } from "./database/database.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const getSongs = async () => {
  const songs = await executeQuery("SELECT * FROM songs");
  if (!songs) {
    return [];
  }
  return songs.rows;
};

const showForm = async ({ render }) => {
  render("index.eta", { songs: await getSongs(), name: "", rating: "" });
};

const getData = async (request) => {
  const data = {
    name: "",
    rating: "",
    errors: [],
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
    data.rating = params.get("rating");
  }

  return data;
};

const validate = (data) => {
  const errors = [];
  if (!data.name || data.name.length < 5 || data.name.length > 20) {
    errors.push("Song name must be between 5 and 20 characters long");
  }

  if (!data.rating || Number(data.rating).toString() !== data.rating || Number(data.rating) < 1 || Number(data.rating) > 10) {
    errors.push("Rating must be a number between 1 and 10");
  }

  return errors;
};

const submitForm = async ({ request, response, render }) => {
  const data = await getData(request);
  data.errors = validate(data);

  if (data.errors.length > 0) {
    render("index.eta", data);
  } else {
    await executeQuery("INSERT INTO songs (name, rating) VALUES ($1, $2)", data.name, data.rating);
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
