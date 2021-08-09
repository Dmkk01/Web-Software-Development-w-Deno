import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.95.0/http/file_server.ts";

const server = serve({ port: 7777 });

for await (const request of server) {
  if (request.url === "/index.html" || request.url == "/about.html") {
    const path = `${Deno.cwd()}/static${request.url}`;
    const response = await serveFile(request, path);
    request.respond(response);
  } else {
    request.respond({ body: "Hello files!" });
  }
}