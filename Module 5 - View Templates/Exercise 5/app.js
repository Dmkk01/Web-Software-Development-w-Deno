import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const requestParams = (url) => {
  let queryParams = "";
  if (url.includes("?")) {
    queryParams = url.slice(url.indexOf("?"));
  }

  return new URLSearchParams(queryParams);
};

const data = {
  name: "John Doe",
};

for await (const request of server) {
  const params = requestParams(request.url);

  if (params.has("name")) {
    data.name = params.get("name");
  }

  request.respond({ body: await renderFile("index.eta", data) });
}