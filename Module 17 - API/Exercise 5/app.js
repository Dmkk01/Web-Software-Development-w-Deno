import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const getSongs = async ({ response }) => {
  const result = await executeQuery("SELECT id, name, rating FROM songs;");
  response.body = result.rows;
};

const getSingleSong = async ({response, params}) => {
  const songID = params.id;
  const result = await executeQuery("SELECT id, name, rating FROM songs WHERE id = $1;", songID);
  response.body = result.rows[0];
}

const addSong = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await executeQuery("INSERT INTO songs (name, rating) VALUES ($1, $2);", document.name, document.rating);
  response.body = { status: "success" };
};

const deleteSong = async ({params, response}) => {
  const songID = params.id;
  await executeQuery("DELETE FROM songs WHERE id = $1", songID);
  response.body = { status: "success" };
}

router.get("/songs", getSongs);
router.get("/songs/:id", getSingleSong);
router.post("/songs", addSong);
router.delete("/songs/:id", deleteSong);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
