import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const getRegisterData = () => {
  return {
      error: '',
      email: '',
  }
}

const registerUser = async ({render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = getRegisterData()

  if (params.get("password").length < 4) {
    data.email = params.get("email");
    data.error = 'The password needs to be more than 4 characters!'
    render("register.eta", data);
    return;
  }

  await userService.addUser(
    params.get("email"),
    await bcrypt.hash(params.get("password")),
  );

  response.redirect("/auth/login");
};

const showRegistrationForm = ({ render }) => {
  const data = getRegisterData()
  render("register.eta", data);
};

export { registerUser, showRegistrationForm };