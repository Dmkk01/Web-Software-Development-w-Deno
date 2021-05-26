import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as animalService from "./services/animalService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const listAnimals = async (request) => {
  const data = {
    animals: await animalService.findAll(),
  };
  request.respond({ body: await renderFile("index.eta", data) });
};

const addAnimal = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);

  const name = params.get("name");

  await animalService.create(name);
  await redirectToAnimals(request);
};

const removeAnimal = async (request) => {
  const parts = request.url.split("/");
  const id = parts[2];

  await animalService.deleteById(id);
  await redirectToAnimals(request);
};

const redirectToAnimals = async (request) => {
  request.respond({
    status: 303,
    headers: new Headers({
      "Location": "/animals",
    }),
  });
};

for await (const request of server) {
  if (request.method === "GET" && request.url === "/animals") {
    await listAnimals(request);
  } else if (request.method === "POST" && request.url === "/animals") {
    await addAnimal(request);
  } else if (request.method === "POST" && request.url.includes("delete")) {
    await removeAnimal(request);
  } else {
    await redirectToAnimals(request);
  }
}