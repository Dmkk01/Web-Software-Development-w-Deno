import { executeQuery } from "../database/database.js";

const createProject = async (name) => {
  await executeQuery("INSERT INTO projects (name) VALUES ($1);", name);
};

const getProjects = async () => {
  let result = await executeQuery(
    "SELECT * FROM projects;",
  );
  return result.rows;
};

const findById = async (id) => {
  let result = await executeQuery("SELECT * FROM projects WHERE id = $1;", id);
  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return { id: 0, name: "Unknown" };
};

const deleteById = async (id) => {
  let result = await executeQuery(
    "DELETE FROM projects WHERE id = $1;",
    id,
  );
};

export { createProject, getProjects, findById, deleteById };