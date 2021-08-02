import { executeQuery } from "../../database/database.js";

const getAccounts = async ({ request, response, state, render }) => {
    const userId = (await state.session.get("user")).id;
    const res = await executeQuery(
        "SELECT * FROM accounts WHERE user_id = $1",
        userId,
      );
    render("accounts.eta", {accounts: res.rows});
  };

  const postAccounts = async ({ request, response, state, render }) => {
    
    const body = request.body();
    const params = await body.value;
  
    const name = params.get("name");
  
    const userId = (await state.session.get("user")).id;
  
    await executeQuery(
      "INSERT INTO accounts (name, user_id) VALUES ($1, $2) ",
      name,
      userId,
    );
    response.redirect("/accounts");
  };

  const getAccount = async ({ request, response, state, render, params }) => {
    const userId = (await state.session.get("user")).id;
    const res = await executeQuery(
      "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
      params.id,
      userID
    );
    const obj = res.rows[0];
    render("account.eta", obj);
  };

  export {
    getAccounts,
    postAccounts,
    getAccount,
  };