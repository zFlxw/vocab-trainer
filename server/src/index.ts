import RootController from "./controller/root.controller";
import LoginController from "./controller/login.controller";
import RegisterController from "./controller/register.controller";
import UserController from "./controller/users/user.controller";
import DeckController from "./controller/decks/deck.controller";

export const controllers = [
  RootController,
  LoginController,
  RegisterController,
  UserController,
  DeckController
];