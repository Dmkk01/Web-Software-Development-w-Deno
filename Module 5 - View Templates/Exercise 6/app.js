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
  object: "gravity",
  value: 0,
};

for await (const request of server) {
  const params = requestParams(request.url);

  if (params.has("object")) {
    data.object = params.get("object");
  }

  if (params.has("value")) {
    data.value = Number(params.get("value"));
  }

  request.respond({ body: await renderFile("index.eta", data) });
}