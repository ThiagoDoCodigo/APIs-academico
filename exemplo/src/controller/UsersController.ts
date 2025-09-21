import { Request, Response } from "express";
import { UserBusiness } from "../business/UsersBusiness";

export class UsersController {
  userBusiness = new UserBusiness();
  async usersGetAll(req: Request, res: Response) {
    try {
      const users = await this.userBusiness.usersGetAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }
}
