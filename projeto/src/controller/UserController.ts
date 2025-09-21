import { Request, Response } from 'express'
import { UserBusiness } from '../business/userBusiness';

export class UserController {
    userBusiness = new UserBusiness()
    verify = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const user = this.userBusiness.verify(email);
            console.log("user:", user)
            res.send(user);
        } catch (error: any) {
            res.send(error.sqlMessage || error.message);
        }
    }
}