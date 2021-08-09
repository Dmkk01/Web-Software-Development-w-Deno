import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const addName = async () => {
  await client.connect();
  await client.queryArray(
    "INSERT INTO names (name) VALUES ('Alan Alexander Milne');",
  );
  await client.end();
};

export default addName;