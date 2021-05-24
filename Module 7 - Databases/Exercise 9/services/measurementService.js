import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const calculateAverage = async () => {
  await client.connect();
  const result = await client.queryObject(
    "SELECT AVG(measurement) AS average FROM measurements WHERE measurement >= 0 AND measurement <= 1000;",
  );
  await client.end();

  if (result.rows && result.rows.length > 0) {
    return result.rows[0].average;
  }

  return false;
};

export { calculateAverage }