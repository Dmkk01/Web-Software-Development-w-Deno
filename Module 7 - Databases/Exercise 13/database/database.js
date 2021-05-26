import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const executeQuery = async (query, ...args) => {
  const response = {};
  try {
    await client.connect();
    const result = await client.queryObject(query, ...args);
    if (result && result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.end();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
