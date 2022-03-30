import { Request, Response } from 'express';
import Controller from '../utils/controller.decorator';
import * as Method from '../utils/handlers.decorator';

@Controller('')
export default class RootController {

    @Method.Get('/')
    public index(req: Request, res: Response) {
        res.status(200).json({ message: 'OK!' });
    }
}