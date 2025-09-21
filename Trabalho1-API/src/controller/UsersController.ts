import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { User, UserWithAge } from "../types/User";
import { usersBusiness } from "../serviceContainer/instances";

export class UsersController {
  async getUsersAll(req: Request, res: Response) {
    try {
      const users: UserWithAge[] = await usersBusiness.getUsersAll();
      const usersSemSenha = users.map(({ password, ...rest }) => rest);
      return res.status(200).json(usersSemSenha);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const idUser = parseInt(req.params.id);

      if (isNaN(idUser) || idUser <= 0) {
        return res.status(400).json({
          message: "Campo ID do usuário inválido!",
        });
      }

      const user: UserWithAge = await usersBusiness.getUserById(idUser);
      const { password, ...userSemSenha } = user;
      return res.status(200).json(userSemSenha);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async getUsersBySearch(req: Request, res: Response) {
    try {
      const searchUser = req.query.search as string;

      if (
        !searchUser ||
        typeof searchUser !== "string" ||
        searchUser.trim() === ""
      ) {
        return res.status(400).json({
          message: "Campo de pesquisa inválido!",
        });
      }

      const users: UserWithAge[] = await usersBusiness.getUsersBySearch(
        searchUser
      );
      const usersSemSenha = users.map(({ password, ...rest }) => rest);

      return res.status(200).json(usersSemSenha);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async getUsersByAgeBetween(req: Request, res: Response) {
    try {
      const minAge = parseInt(req.params.min);
      const maxAge = parseInt(req.params.max);

      if (isNaN(minAge) || isNaN(maxAge) || minAge < 0 || maxAge < 1) {
        return res.status(400).json({
          message: "Idades enviadas inválidas!",
        });
      }

      const users: UserWithAge[] = await usersBusiness.getUsersByAgeBetween(
        minAge,
        maxAge
      );
      const usersSemSenha = users.map(({ password, ...rest }) => rest);

      return res.status(200).json(usersSemSenha);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const user = req.body.user as Omit<User, "id">;

      if (
        !user.name ||
        typeof user.name !== "string" ||
        user.name.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo nome é obrigatório!",
        });
      }
      if (
        !user.email ||
        typeof user.email !== "string" ||
        user.email.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo email é obrigatório!",
        });
      }
      if (
        !user.role ||
        typeof user.role !== "string" ||
        user.role.trim() === "" ||
        (user.role !== "admin" && user.role !== "user")
      ) {
        return res.status(400).json({
          message:
            "O campo de permissão é obrigatório e deve ser 'admin' ou 'user'!",
        });
      }
      if (
        !user.password ||
        typeof user.password !== "string" ||
        user.password.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo senha é obrigatório!",
        });
      }
      if (
        !user.nasc ||
        typeof user.nasc !== "string" ||
        user.nasc.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo nascimento é obrigatório!",
        });
      }

      const newUser: UserWithAge = await usersBusiness.addUser(user);
      const { password, ...userSemSenha } = newUser;
      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        usuario: userSemSenha,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async putUser(req: Request, res: Response) {
    try {
      const idUser = parseInt(req.params.id);
      const user = req.body.user as Omit<User, "id">;

      if (isNaN(idUser) || idUser <= 0) {
        return res.status(400).json({
          message: "O campo ID do usuário é obrigatório!",
        });
      }

      if (
        !user.name ||
        typeof user.name !== "string" ||
        user.name.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo nome é obrigatório!",
        });
      }
      if (
        !user.email ||
        typeof user.email !== "string" ||
        user.email.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo email é obrigatório!",
        });
      }
      if (
        !user.role ||
        typeof user.role !== "string" ||
        user.role.trim() === "" ||
        (user.role !== "admin" && user.role !== "user")
      ) {
        return res.status(400).json({
          message:
            "O campo de permissão é obrigatório e deve ser 'admin' ou 'user'!",
        });
      }
      if (
        !user.password ||
        typeof user.password !== "string" ||
        user.password.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo senha é obrigatório!",
        });
      }
      if (
        !user.nasc ||
        typeof user.nasc !== "string" ||
        user.nasc.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo nascimento é obrigatório!",
        });
      }

      const updatedUser: UserWithAge = await usersBusiness.putUser(
        user,
        idUser
      );
      const { password, ...userSemSenha } = updatedUser;
      return res.status(201).json({
        message: "Usuário atualizado com sucesso!",
        usuario: userSemSenha,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async deleteInativesUsers(req: Request, res: Response) {
    try {
      const deletedUsers: UserWithAge[] =
        await usersBusiness.deleteInativesUsers();
      const usersSemSenha = deletedUsers.map(({ password, ...rest }) => rest);
      return res.status(201).json({
        message: "Usuários inativos deletados!",
        users: usersSemSenha,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }
}
