import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({});

const create = async (name, address) => {
  await client.connect();
  await client.queryObject(
    "INSERT INTO addresses (name, address) VALUES ($1, $2);",
    name,
    address,
  );
  await client.end();
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM addresses WHERE name ILIKE $1 OR address ILIKE $2;",
    likePart,
    likePart,
  );
  await client.end();

  return result.rows;
};

const findByName = async (name) => {
  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM addresses WHERE name = $1;",
    name,
  );
  await client.end();

  return result.rows;
};

const findByAddress = async (address) => {
  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM addresses WHERE address = $1;",
    address,
  );
  await client.end();

  return result.rows;
};

const findByNameAndAddress = async (name, address) => {
  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM addresses WHERE name = $1 AND address = $2;",
    name,
    address,
  );
  await client.end();

  return result.rows;
};

export {
  create,
  findByAddress,
  findByName,
  findByNameAndAddress,
  findByNameOrAddressLike,
};