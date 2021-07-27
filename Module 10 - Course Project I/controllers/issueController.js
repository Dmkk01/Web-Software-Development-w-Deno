import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addIssue = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const description = params.get("description");

  const urlParts = request.url.split("/");
  await issueService.createIssue(urlParts[2], description);
  await requestUtils.redirectTo(request, `/projects/${urlParts[2]}`);
};

const removeIssue = async (request) => {
  const urlParts = request.url.split("/");
  await issueService.deleteById(urlParts[4]);
  await requestUtils.redirectTo(request, `/projects/${urlParts[2]}`);
}

export { addIssue, removeIssue };