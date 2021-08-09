import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}
const server = serve({ port: port });

const viewAddresses = async (request) => {
  const data = {
    addresses: await addressService.findAll(),
  };

  request.respond({ body: await renderFile("index.eta", data) });
};

const addAddress = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);

  const sender = params.get("sender");
  const message = params.get("message");

  await addressService.create(sender, message);

  request.respond({
    status: 303,
    headers: new Headers({
      "Location": "/",
    }),
  });
};
const deleteAddress = async (request) => {
  const id = request.url.split("/")[2];
  console.log("delete id " + id);
  await addressService.deleteById(id);

  request.respond({
    status: 303,
    headers: new Headers({
      "Location": "/",
    }),
  });
};

for await (const request of server) {
  if (request.method === "POST" && request.url.startsWith("/delete/")) {
    console.log("delete");
    await deleteAddress(request);
  } else if (request.method === "POST") {
    await addAddress(request);
  } else {
    await viewAddresses(request);
  }
}