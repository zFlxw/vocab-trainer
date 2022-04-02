import { Request, Response } from "express";
import { authenticateToken } from "../../utils/authentication";
import Controller from "../../utils/controller.decorator";
import { Get } from "../../utils/handlers.decorator";

@Controller("/auth/validate")
export default class ValidateController {

  @Get('')
  public async validate(req: Request, res: Response) {
    authenticateToken(req, res, () => {
      res.sendStatus(200)
    });
  }
}