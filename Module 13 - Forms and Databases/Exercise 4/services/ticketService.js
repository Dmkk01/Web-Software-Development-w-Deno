import { executeQuery } from "../database/database.js";

const findAll = async () => {
   const result = await executeQuery("SELECT * FROM tickets;");
    if (result) {
        return result.rows;
    }
    return [];
};

export { findAll };