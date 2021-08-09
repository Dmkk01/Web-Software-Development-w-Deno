import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const getNames = async () => {
  await client.connect();
  const result = await client.queryObject("SELECT * FROM names;");
  await client.end();

  return result.rows;
};

export default getNames;