import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const create = async (name, rating) => {
  await client.connect();
  await client.queryObject(
    "INSERT INTO songs (name, rating) VALUES ($1, $2);",
    name,
    rating,
  );
  await client.end();
};

const deleteById = async (id) => {
  await client.connect();
  await client.queryObject("DELETE FROM songs WHERE id = $1;", id);
  await client.end();
};

const findAll = async () => {
  await client.connect();
  const result = await client.queryObject("SELECT * FROM songs;");
  await client.end();

  return result.rows;
};

export { create, deleteById, findAll };