import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as nameService from "./services/nameService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const addName = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);

  const name = params.get("name");

  await nameService.create(name);

  await redirectToNames(request);
};

const deleteName = async (request) => {
  console.log(`Delete name based on request url ${request.url}`);
  const parts = request.url.split("/");
  const id = parts[2];

  await nameService.deleteById(id);

  await redirectToNames(request);
};

const listNames = async (request) => {
  const data = {
    names: await nameService.findAll(),
  };
  request.respond({ body: await renderFile("index.eta", data) });
};

const redirectToNames = async (request) => {
  request.respond({
    status: 303,
    headers: new Headers({
      "Location": "/names",
    }),
  });
};

for await (const request of server) {
  if (request.method === "GET" && request.url === "/names") {
    await listNames(request);
  } else if (request.method === "POST" && request.url === "/names") {
    await addName(request);
  } else if (request.method === "POST" && request.url.includes("delete")) {
    await deleteName(request);
  } else {
    await redirectToNames(request);
  }
}