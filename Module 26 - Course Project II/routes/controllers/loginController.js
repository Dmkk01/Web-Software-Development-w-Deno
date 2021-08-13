import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
const error = ''

const processLogin = async ({ render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    render("login.eta", {error: 'No user with these credentials was found in the database.'});
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(params.get("password"), user.password,);

  if (!passwordMatches) {
    render("login.eta", {error: 'Wrong credentials.'});
    return;
  }

  await state.session.set("user", user);
  response.redirect("/questions");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };