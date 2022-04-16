import RootController from "./controller/root.controller";
import LoginController from "./controller/login.controller";
import RegisterController from "./controller/register.controller";
import ValidateController from "./controller/auth/validate.controller"
import UserController from "./controller/users/user.controller";
import DeckController from "./controller/decks/deck.controller";

export const controllers = [
  RootController,
  LoginController,
  RegisterController,
  ValidateController,
  UserController,
  DeckController
];