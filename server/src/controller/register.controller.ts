import Controller from '../utils/controller.decorator';
import { Request, Response } from 'express';
import { Post } from '../utils/handlers.decorator';
import { User } from '../entity/User';
import { Hashing } from '../utils/hashing';
import { signToken } from '../utils/authentication';
import { dataSource } from '../server';

@Controller('/register')
export default class RegisterController {
  hashUtils: Hashing = new Hashing();

  /**
   * Handles the registration of new users.
   *
   * @param req The request.
   * @param res The response.
   */
  @Post('')
  public async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing Arguments.' });
    }

    const usernameQuery = await dataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = LOWER(:username)", { username: username.toLowerCase() })
      .getOne();
    
    const emailQuery = await dataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = LOWER(:email)', { email: email.toLowerCase(), })
      .getOne();
      
    if (usernameQuery !== null) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    if (emailQuery !== null) {
      return res.status(409).json({ message: 'E-Mail already exists.' });
    }

    const newUser: User = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = this.hashUtils.hash(
      password,
      Number(process.env.SALT_LENGTH!!)
    );

    dataSource
      .getRepository(User)
      .save(newUser)
      .then((user) => {
        const userPart = {
          id: user.id,
          email: user.email,
          username: user.username,
          decks: user.decks,
        };
        signToken({ id: user.id, username: user.username }, (error, token) => {
          if (error) {
            return res.status(500).json({ message: error.message, error });
          }

          return res
            .status(200)
            .json({ message: 'Register successful.', user: userPart, token });
        });
      });
  }
}
