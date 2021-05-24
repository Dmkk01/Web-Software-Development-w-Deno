import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const data = {
  methods: [],
};

for await (const request of server) {
  if (request.url === "/methods") {
    data.methods.push(request.method);
    request.respond({ body: await renderFile("index.eta", data) });
  } else {
    request.respond({ status: 404 });
  }
}