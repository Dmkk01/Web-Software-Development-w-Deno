import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

const data = {
  emperors: [],
};

const processBody = async (request) => {
  const bodyArr = await Deno.readAll(request.body);
  const body = new TextDecoder().decode(bodyArr);
  const params = new URLSearchParams(body);
  data.emperors.push(params.get("name"));
};

for await (const request of server) {
  if (request.method === "POST") {
    await processBody(request);
    request.respond({
      status: 303,
      headers: new Headers({
        "Location": request.url,
      }),
    });
  } else {
    request.respond({ body: await renderFile("index.eta", data) });
  }
}