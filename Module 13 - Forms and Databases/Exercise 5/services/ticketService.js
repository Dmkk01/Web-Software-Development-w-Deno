import { executeQuery } from "../database/database.js";

const findAll = async () => {
   const result = await executeQuery("SELECT * FROM tickets;");
    if (result) {
        return result.rows;
    }
    return [];
};

const add = async (content) => {
    await executeQuery("INSERT INTO tickets (content, reported_on) VALUES ($1, NOW());", content)
  }

export { add, findAll };