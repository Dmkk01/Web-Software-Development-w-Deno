import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const findByNameLike = async (name) => {
  let likePart = `%${name}%`;

  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM names WHERE name ILIKE $1;",
    likePart,
  );
  await client.end();

  return result.rows;
};

export default findByNameLike;