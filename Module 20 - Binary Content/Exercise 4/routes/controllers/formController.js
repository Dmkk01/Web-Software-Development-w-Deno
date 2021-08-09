import { lastUploadedId } from "../../services/fileService.js";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import { executeQuery } from "../../database/database.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const processUpload = async({request, response}) => {
  const body = request.body({type: "form-data"});
  const reader = await body.value;
  const data = await reader.read();

  const fileDetails = data.files[0];

  const fileContents = await Deno.readAll(await Deno.open(fileDetails.filename));
  const base64Encoded = base64.fromUint8Array(fileContents);

  const pw = `${Math.floor(100000 * Math.random())}`;
  const hash = await bcrypt.hash(pw);

  await executeQuery("INSERT INTO miniupload_files (name, type, password, data) VALUES ($1, $2, $3, $4);",
    fileDetails.originalName,
    fileDetails.contentType,
    hash,
    base64Encoded
  );


  response.body = pw;
};


const getFile = async({request, response}) => {

  const body = request.body({type: "form"});
  const params = await body.value;
  const fileID = params.get("id");
  const password = params.get("password");

  const res = await executeQuery("SELECT * FROM miniupload_files WHERE id = $1;", fileID);
  const obj = res.rows[0];

  if (!password || !obj || !res) {
    response.status = 401;
    return;
  }
  const passwordCorrect = await bcrypt.compare(password, obj.password);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }
  response.headers.set('Content-Type', obj.type);
  const arr = base64.toUint8Array(obj.data);
  response.headers.set('Content-Length', arr.length);
  response.body = arr;
}


export { viewForm, processUpload, getFile };
