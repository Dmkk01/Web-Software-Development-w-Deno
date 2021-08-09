import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const findByName = async (name) => {
  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM names WHERE name = $1;",
    name,
  );
  await client.end();

  return result.rows;
};

export default findByName;