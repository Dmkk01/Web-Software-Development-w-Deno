import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const create = async (name) => {
  await client.connect();
  await client.queryObject(
    "INSERT INTO animals (name) VALUES ($1);",
    name,
  );
  await client.end();
};

const deleteById = async (id) => {
  try {
    await client.connect();
    await client.queryObject(
      "DELETE FROM animals WHERE id = $1;",
      id,
    );
  } catch (e) {
    console.log(e);
  } finally {
    try {
      await client.end();
    } catch (e) {
      console.log(e);
    }
  }
};

const findAll = async () => {
  await client.connect();
  const result = await client.queryObject("SELECT * FROM animals;");
  await client.end();

  return result.rows;
};

export { create, deleteById, findAll };