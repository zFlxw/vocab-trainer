import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { authenticateToken, decodeToken } from "../../utils/authentication";
import Controller from "../../utils/controller.decorator";
import { Get, Post } from "../../utils/handlers.decorator";

@Controller("/decks")
export default class DeckController {

  @Get("/")
  public async getDecks(req: Request, res: Response) {
    authenticateToken(req, res, async () => {
      const token = req.headers.authorization?.split(' ')[1]!!;
      const id = decodeToken(token)?.id;
      if (!id) {
        console.log(token, id);
        return res.status(400).json({ message: "Invalid token" });
      }

      const user = await getRepository(User).findOne({ where: { id: Number(id) } });
      if (user) {
        return res.status(200).json({ decks: user.decks });
      }

      return res.status(404).json({ message: "User not found." });
    });
  }

  @Post("/")
  public async addDeck(req: Request, res: Response) {
    authenticateToken(req, res, () => {
      res.status(501).send("Not yet implemented");
    });
  }
}