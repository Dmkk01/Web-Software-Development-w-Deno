import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const create = async (name) => {
  await client.connect();
  await client.queryObject("INSERT INTO names (name) VALUES ($1);", name);
  await client.end();
};

const deleteById = async (id) => {
  await client.connect();
  await client.queryObject("DELETE FROM names WHERE id = $1;", id);
  await client.end();
};

const findAll = async () => {
  await client.connect();
  const result = await client.queryObject("SELECT * FROM names;");
  await client.end();

  return result.rows;
};

export { create, deleteById, findAll };