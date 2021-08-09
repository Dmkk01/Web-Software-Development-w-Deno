import { renderFile } from "https://deno.land/x/eta@v1.12.1/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addTask = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const name = params.get("name");

  await taskService.create(name);
  await requestUtils.redirectTo(request, "/tasks");
};

const viewTask = async (request) => {
    const urlParts = request.url.split("/");
  
    const data = {
      task: await taskService.findById(urlParts[2]),
      currentWorkEntry: await workEntryService.findCurrentWorkEntry(urlParts[2]),
      totalTime: await workEntryService.calculateTotalTime(urlParts[2]),
    };
    
    request.respond({ body: await renderFile("task.eta", data) });
  };

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  request.respond({ body: await renderFile("tasks.eta", data) });
};
const completeTask = async (request) => {
    const urlParts = request.url.split("/");
    await taskService.completeById(urlParts[2]);
    await requestUtils.redirectTo("/tasks");
  };

export { addTask, viewTask, viewTasks, completeTask };