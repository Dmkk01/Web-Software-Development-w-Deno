import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const getGames = async ({ response }) => {
  const result = await executeQuery("SELECT id, name FROM games;");
  response.body = result.rows;
};

const getSingleGame = async ({response, params}) => {
  const gameID = params.id;
  const result = await executeQuery("SELECT id, name FROM games WHERE id = $1;", gameID);
  response.body = result.rows[0];
}

const addGame = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  await executeQuery("INSERT INTO games (name) VALUES ($1);", document.name);
  response.body = { status: "success" };
};

const deleteGame = async ({params, response}) => {
  const gameID = params.id;
  await executeQuery("DELETE FROM games WHERE id = $1", gameID);
  await executeQuery("DELETE FROM ratings WHERE game_id = $1", gameID);
  response.body = { status: "success" };
}

const addRating = async ({ request, response, params }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const gameID = params.id;
  await executeQuery("INSERT INTO ratings (rating, game_id) VALUES ($1, $2);", document.rating, gameID);
  response.body = { status: "success" };
};

const getRatings = async ({ response, params }) => {
  const gameID = params.id;
  const result = await executeQuery("SELECT id, rating, game_id FROM ratings WHERE game_id = $1;", gameID);
  response.body = result.rows;
};


router.get("/games", getGames);
router.post("/games", addGame);
router.get("/games/:id", getSingleGame);
router.delete("/games/:id", deleteGame);
router.post("/games/:id/ratings", addRating);
router.get("/games/:id/ratings", getRatings); 

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
