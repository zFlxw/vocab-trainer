import Controller from "../utils/controller.decorator";
import {Request, Response} from "express";
import {Post} from "../utils/handlers.decorator";
import {User} from "../entity/User";
import {Hashing} from "../utils/hashing";
import {getRepository} from "typeorm";
import {signToken} from "../utils/authentication";

@Controller('/login')
export default class LoginController {
    hashUtils: Hashing = new Hashing();

    /**
     * Handles user login requests.
     *
     * @param req The request.
     * @param res The response.
     */
    @Post('')
    public async login(req: Request, res: Response) {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Missing Arguments.'});
        }

        const user: User | null = await getRepository(User).findOne({where: [{email}, {username: email}]});
        if (user === null) {
            return res.status(404).json({message: 'User not found.'});
        }

        if (!this.hashUtils.verify(user.password, password)) {
            return res.status(400).json({message: 'Invalid password.'});
        }

        signToken({ id: user.id, username: user.username }, (err, token) => {
            if (err !== null) {
                res.status(500).json({ message: err.message, error: err });
            } else {
                res.status(200).json({message: 'Login authorized.',
                    user: { id: user.id, username: user.username, email: user.email }, token});
            }
        });
    }
}