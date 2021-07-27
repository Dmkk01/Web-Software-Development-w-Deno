import { executeQuery } from "../database/database.js";

const createIssue = async (project_id, description) => {
  await executeQuery(
    "INSERT INTO project_issues (project_id, description ) VALUES ($1, $2);",
    project_id,
    description, 
  );
};

const findById = async (id) => {
  let result = await executeQuery("SELECT * FROM project_issues WHERE project_id = $1;", id);
  if (result.rows && result.rows.length > 0) {
    return result.rows;
  }

  return false;
};

const deleteByProjectId = async (project_id) => {
  let result = await executeQuery(
    "DELETE FROM project_issues WHERE project_id = $1;",
    project_id,
  );
};

const deleteById = async (id) => {
  let result = await executeQuery(
    "DELETE FROM project_issues WHERE id = $1;",
    id,
  );
};

export {
    createIssue, findById, deleteByProjectId, deleteById
};