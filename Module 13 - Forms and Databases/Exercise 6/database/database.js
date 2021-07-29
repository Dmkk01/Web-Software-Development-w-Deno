import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

// const CONCURRENT_CONNECTIONS = 2;
// const connectionPool = new Pool({
//   hostname: "hostname-possibly-at-elephantsql.com",
//   database: "database-name",
//   user: "user-name-typically-same-as-database-name",
//   password: "password",
//   port: 5432,
// }, CONCURRENT_CONNECTIONS);
const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
}, CONCURRENT_CONNECTIONS)

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };