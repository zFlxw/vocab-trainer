import { Request, Response } from "express";
import { authenticateToken, decodeToken } from "../../utils/authentication";
import Controller from "../../utils/controller.decorator";
import { Get, Post } from "../../utils/handlers.decorator";
import { getUserByToken } from "../../utils/users";

@Controller("/decks")
export default class DeckController {

  @Get("/")
  public getDecks(req: Request, res: Response) {
    authenticateToken(req, res, async () => {
      const user = await getUserByToken(req.headers.authorization?.split(' ')[1]!!);
      if (user) {
        return res.status(200).json({ decks: user.decks });
      }

      return res.status(404).json({ message: "User not found." });
    });
  }

  @Post("/")
  public addDeck(req: Request, res: Response) {
    authenticateToken(req, res, async () => {
      const user = await getUserByToken(req.headers.authorization?.split(' ')[1]!!);
      const { name } = req.body;
      if (!(user && name)) {
        return res.status(400).json({ message: "Missing name or invalid token." });
      }

    });
  }
}