import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({
  hostname: "postgres://oarcyhft:zzIRsHzYJiNPu8SJHa2XmOylAg1pSyM7@dumbo.db.elephantsql.com/oarcyhft",
  database: "oarcyhft",
  user: "oarcyhft",
  password: "zzIRsHzYJiNPu8SJHa2XmOylAg1pSyM7 ",
  port: 5432,
});

await client.connect();
const result = await client.queryArray("SELECT * FROM names;");
await client.end();

console.log(result.rows);