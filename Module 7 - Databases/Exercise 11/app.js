import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as nameService from "./services/songService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const addName = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);

  const name = params.get("name");
  const rating = params.get("rating");

  await nameService.create(name, rating);

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
    songs: await nameService.findAll(),
  };
  request.respond({ body: await renderFile("index.eta", data) });
};

const redirectToNames = async (request) => {
  request.respond({
    status: 303,
    headers: new Headers({
      "Location": "/songs",
    }),
  });
};

for await (const request of server) {
  if (request.method === "GET" && request.url === "/songs") {
    await listNames(request);
  } else if (request.method === "POST" && request.url === "/songs") {
    await addName(request);
  } else if (request.method === "POST" && request.url.includes("delete")) {
    await deleteName(request);
  } else {
    await redirectToNames(request);
  }
}