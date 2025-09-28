import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { UserPost, UserWithAge, UserUpdates } from "../types/UserType";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  getUsersAll = async (req: Request, res: Response) => {
    try {
      const users: UserWithAge[] = await this.userService.getUsersAll();
      return res.status(200).json({
        users: users,
        message: "Usuários consultados com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id_user = Number(req.params.id);

      if (!Number.isInteger(id_user) || id_user < 1) {
        return res.status(400).json({
          message: "O campo ID do usuário é inválido!",
          success: false,
        });
      }

      const user: UserWithAge = await this.userService.getUserById(id_user);
      return res
        .status(200)
        .json({ user: user, message: "Usuário consultado!", success: true });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  getUsersByName = async (req: Request, res: Response) => {
    try {
      const name_user = req.query.search as string;

      if (!name_user) {
        return res.status(400).json({
          message: "O campo nome do usuário não foi enviado!",
          success: false,
        });
      }

      if (typeof name_user !== "string" || name_user.trim() === "") {
        return res
          .status(400)
          .json({ message: "O campo ID do usuário inválido!", success: false });
      }

      const users: UserWithAge[] = await this.userService.getUsersByName(
        name_user
      );
      return res.status(200).json({
        users: users,
        message: "Usuários consultados!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  getUsersByAgeBetween = async (req: Request, res: Response) => {
    try {
      const minAge = Number(req.params.min);
      const maxAge = Number(req.params.max);

      if (!Number.isInteger(minAge) || minAge < 1) {
        return res.status(400).json({
          message: "O campo de idade mínima é inválido!",
          success: false,
        });
      }

      if (!Number.isInteger(maxAge) || maxAge < 1) {
        return res.status(400).json({
          message: "O campo de idade máxima é inválido!",
          success: false,
        });
      }

      if (minAge > maxAge) {
        return res.status(400).json({
          message: "A idade mínima não pode ser maior que a idade máxima!",
          success: false,
        });
      }

      const users: UserWithAge[] = await this.userService.getUsersByAgeBetween(
        minAge,
        maxAge
      );
      return res.status(200).json({
        users: users,
        message: "Usuários consultados!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      }

      return res
        .status(500)
        .json({ message: "Erro inesperado!", success: false });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const newUser = req.body.user as UserPost;

      if (!newUser.name_user) {
        return res.status(400).json({
          message: "O campo de nome do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newUser.name_user !== "string" ||
        newUser.name_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de nome do usuário inválido!",
          success: false,
        });
      }

      if (!newUser.email_user) {
        return res.status(400).json({
          message: "O campo de email do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newUser.email_user !== "string" ||
        newUser.email_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de email do usuário inválido!",
          success: false,
        });
      }

      if (!newUser.role_user) {
        return res.status(400).json({
          message: "O campo de role do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newUser.role_user !== "string" ||
        (newUser.role_user !== "admin" && newUser.role_user !== "user")
      ) {
        return res.status(400).json({
          message: "O campo de role do usuário inválido!",
          success: false,
        });
      }

      if (!newUser.nasc_user) {
        return res.status(400).json({
          message: "O campo de data de nascimento do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newUser.nasc_user !== "string" ||
        newUser.nasc_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de data de nascimento do usuário inválido!",
          success: false,
        });
      }

      if (!newUser.password_user) {
        return res.status(400).json({
          message: "O campo de senha do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newUser.password_user !== "string" ||
        newUser.password_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de senha do usuário inválido!",
          success: false,
        });
      }

      const user: UserWithAge = await this.userService.createUser(newUser);
      return res.status(201).json({
        user: user,
        message: "Usuário criado com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  putUser = async (req: Request, res: Response) => {
    try {
      const id_user = Number(req.params.id);
      const userUpdates = req.body.user as UserUpdates;

      if (!Number.isInteger(id_user) || id_user < 1) {
        return res.status(400).json({
          message: "O campo ID do usuário é inválido!",
          success: false,
        });
      }

      if (typeof id_user !== "number" || id_user < 1) {
        return res
          .status(400)
          .json({ message: "O campo ID do usuário inválido!", success: false });
      }

      if (!userUpdates.name_user) {
        return res.status(400).json({
          message: "O campo de nome do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof userUpdates.name_user !== "string" ||
        userUpdates.name_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de nome do usuário inválido!",
          success: false,
        });
      }

      if (!userUpdates.email_user) {
        return res.status(400).json({
          message: "O campo de email do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof userUpdates.email_user !== "string" ||
        userUpdates.email_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de email do usuário inválido!",
          success: false,
        });
      }

      if (!userUpdates.role_user) {
        return res.status(400).json({
          message: "O campo de role do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof userUpdates.role_user !== "string" ||
        (userUpdates.role_user !== "admin" && userUpdates.role_user !== "user")
      ) {
        return res.status(400).json({
          message: "O campo de role do usuário inválido!",
          success: false,
        });
      }

      if (!userUpdates.nasc_user) {
        return res.status(400).json({
          message: "O campo de data de nascimento do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof userUpdates.nasc_user !== "string" ||
        userUpdates.nasc_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de data de nascimento do usuário inválido!",
          success: false,
        });
      }

      if (!userUpdates.password_user) {
        return res.status(400).json({
          message: "O campo de senha do usuário não foi enviado!",
          success: false,
        });
      }

      if (
        typeof userUpdates.password_user !== "string" ||
        userUpdates.password_user.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de senha do usuário inválido!",
          success: false,
        });
      }

      const user: UserWithAge = await this.userService.putUser(
        userUpdates,
        id_user
      );
      return res.status(201).json({
        user: user,
        message: "Usuário atualizado com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  };

  deleteUserWithoudPost = async (req: Request, res: Response) => {
    try {
      const users: UserWithAge[] =
        await this.userService.deleteUserWithoudPost();
      return res.status(200).json({
        users: users,
        message: "Usuários deletados com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  };
}
