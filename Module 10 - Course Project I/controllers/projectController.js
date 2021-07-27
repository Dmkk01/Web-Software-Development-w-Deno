import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addProject = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const name = params.get("name");

  await projectService.createProject(name);
  await requestUtils.redirectTo(request, "/projects");
};

const viewProjects = async (request) => {
  const data = {
    projects: await projectService.getProjects(),
  };

  request.respond({ body: await renderFile("projects.eta", data) });
};

const viewProject = async (request) => {
  const urlParts = request.url.split("/");

  const data = {
    project: await projectService.findById(urlParts[2]),
    issues: await issueService.findById(urlParts[2]),
  };

  request.respond({ body: await renderFile("project.eta", data) });
};

const removeProject = async (request) => {
  const urlParts = request.url.split("/");
  await issueService.deleteByProjectId(urlParts[2]);
  await projectService.deleteById(urlParts[2]);
  await requestUtils.redirectTo(request, "/projects");
}

export { addProject, viewProjects, viewProject, removeProject };