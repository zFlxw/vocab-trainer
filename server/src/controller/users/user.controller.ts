import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { authenticateToken, decodeToken } from "../../utils/authentication";
import Controller from "../../utils/controller.decorator";
import { Get } from "../../utils/handlers.decorator";

@Controller('/users')
export default class UserController {

  @Get("/:id")
  public async getUserById(req: Request, res: Response) {
    authenticateToken(req, res, async () => {
      const { id } = req.params;

      const user: User | null = await getRepository(User).findOne({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      
      const decodedToken = decodeToken(req.headers.authorization?.split(" ")[1]!!);
      if (!decodedToken) {
        return res.status(500).json({ message: "Failed to decode token." });
      }

      if (user.id !== decodedToken.id) {
        return res.status(403).json({ message: "You are not allowed to request this user." });
      }

      return res.status(200).json({ id: user.id, username: user.username, email: user.email });
    });
  }
}