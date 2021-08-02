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

  const depositMoney = async ({ request, response, state, render, params }) => {
    const body = request.body();
    const paramsss = await body.value;
  
    const amount = paramsss.get("amount");
  
    const userId = (await state.session.get("user")).id;
    if(!userId) {
      response.status = 401;
    }
    const res = await executeQuery(
      "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
      params.id,
      userID
    );
    const obj = res.rows[0].balance;
    const newBalance = obj + amount
    await executeQuery(
      "UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3;",
      newBalance,
      params.id,
      userId,
    );
    response.redirect("/accounts");
  };

  const withdrawMoney = async ({ request, response, state, render, params }) => {
    const body = request.body();
    const paramsss = await body.value;
  
    const amount = paramsss.get("amount");
  
    const userId = (await state.session.get("user")).id;
    if(!userId) {
      response.status = 401;
    }
    const res = await executeQuery(
      "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
      params.id,
      userID
    );
    const obj = res.rows[0].balance;
    const newBalance = obj - amount
    if (newBalance < 0) {
      response.status = 401;
    }
    else {
      await executeQuery(
        "UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3;",
        newBalance,
        params.id,
        userId,
      );
      response.redirect("/accounts");
    }
  };

  export {
    getAccounts,
    postAccounts,
    getAccount,
    withdrawMoney,
    depositMoney,
  };