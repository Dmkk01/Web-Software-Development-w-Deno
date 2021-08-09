import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as taskController from "./controllers/taskController.js";
import * as workEntryController from "./controllers/workEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

for await (const request of server) {
    if (request.url === "/" && request.method === "GET") {
      await requestUtils.redirectTo(request, "/tasks");
    } else if (request.url === "/tasks" && request.method === "POST") {
      await taskController.addTask(request);
    } else if (request.url === "/tasks" && request.method === "GET") {
      await taskController.viewTasks(request);
    } else if (request.url.match("tasks/[0-9]+") && request.method === "GET") {
      await taskController.viewTask(request);
    } else if (request.url.match("tasks/[0-9]+/entries[0-9]+") && request.method === "POST") {
      await workEntryController.finishWorkEntry(request);
    } else if (request.url.match("tasks/[0-9]+/entries") && request.method === "POST") {
      await workEntryController.createWorkEntry(request);
    } else if (request.url.match("tasks/[0-9]+") && request.method === "POST") {
      await taskController.completeTask(request);
    } else {
      request.respond({ status: 404 });
    }
  }