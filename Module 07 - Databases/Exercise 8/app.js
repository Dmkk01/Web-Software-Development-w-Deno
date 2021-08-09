import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as nameService from "./services/nameService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const listNames = async (request) => {
  const data = {
    names: await nameService.findAll(),
  };
  request.respond({ body: await renderFile("index.eta", data) });
};

for await (const request of server) {
  await listNames(request);
}