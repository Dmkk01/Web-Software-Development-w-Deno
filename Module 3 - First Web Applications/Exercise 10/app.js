import { serve } from "https://deno.land/std@0.95.0/http/server.ts";

const server = serve({ port: 7777 });

let counter = 5;

for await (const request of server) {
  if (request.url === "/count") {
    if (counter > 0) {
      request.respond({ body: `${counter}` });
      counter--;
    } else {
      request.respond({ body: "Kaboom!" });
    }
  } else {
    request.respond({ body: "Hello world!" });
  }
}