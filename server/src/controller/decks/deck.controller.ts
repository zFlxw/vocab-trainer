import { Request, Response } from "express";
import { authenticateToken } from "../../utils/authentication";
import Controller from "../../utils/controller.decorator";
import { Get } from "../../utils/handlers.decorator";

@Controller("/decks")
export default class DeckController {

  @Get("/")
  public async getDecks(req: Request, res: Response) {
    authenticateToken(req, res, () => {
      res.status(501).send("Not yet implemented");
    });
  }
}