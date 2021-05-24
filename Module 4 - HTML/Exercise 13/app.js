import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.95.0/http/file_server.ts";

const server = serve({ port: 7777 });

for await (const request of server) {
  const response = await serveFile(request, "static/index.html");
  request.respond(response);
}