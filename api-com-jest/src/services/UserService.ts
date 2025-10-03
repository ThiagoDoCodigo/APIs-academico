import { UserRepository } from "../repositories/UserRepository";
import { CustomError } from "../errors/CustomError";
import { UserWithAge, UserPost, UserUpdates } from "../types/UserType";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getUsersAll = async (): Promise<UserWithAge[]> => {
    try {
      const users: UserWithAge[] = await this.userRepository.getUsersAll();

      if (!users || users.length === 0) {
        throw new CustomError("Nenhum usuário encontrado.", 404);
      }

      return users;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        error.message || "Erro ao consultar usuários!",
        500
      );
    }
  };

  getUserById = async (id_user: number): Promise<UserWithAge> => {
    try {
      const user: UserWithAge[] = await this.userRepository.getUserById(
        id_user
      );

      if (!user || user.length === 0) {
        throw new CustomError("Usuário não encontrado.", 404);
      }

      return user[0] as UserWithAge;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro ao consultar usuário!", 500);
    }
  };

  getUsersByName = async (name_user: string): Promise<UserWithAge[]> => {
    try {
      const users: UserWithAge[] = await this.userRepository.getUsersByName(
        name_user
      );
      if (!users || users.length === 0) {
        throw new CustomError(
          "Nenhuma correspondência com a pesquisa enviada!",
          404
        );
      }
      return users as UserWithAge[];
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        error.message || "Erro ao consultar usuários!",
        500
      );
    }
  };

  getUsersByAgeBetween = async (
    minAge: number,
    maxAge: number
  ): Promise<UserWithAge[]> => {
    try {
      const users: UserWithAge[] =
        await this.userRepository.getUsersByAgeBetween(minAge, maxAge);

      if (!users || users.length === 0) {
        throw new CustomError(
          "Nenhum usuário encontrado na faixa etária informada.",
          404
        );
      }

      return users as UserWithAge[];
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        error.message || "Erro ao consultar usuários!",
        500
      );
    }
  };

  createUser = async (newUser: UserPost): Promise<UserWithAge> => {
    try {
      const hashedPassword = await bcrypt.hash(
        newUser.password_user.trim(),
        10
      );
      newUser.password_user = hashedPassword;

      const createdUser: UserWithAge[] = await this.userRepository.createUser(
        newUser
      );

      if (!createdUser || createdUser.length === 0) {
        throw new CustomError("Não foi possível criar o usuário!", 400);
      }

      return createdUser[0] as UserWithAge;
    } catch (error: any) {
      if (error.original?.code === "23505") {
        throw new CustomError(
          "Este email já está sendo utilizado por outro usuário!",
          409
        );
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError("Erro ao criar usuário!", 500);
    }
  };

  putUser = async (
    userUpdates: UserUpdates,
    id_user: number
  ): Promise<UserWithAge> => {
    try {
      const hashedPassword = await bcrypt.hash(
        userUpdates.password_user.trim(),
        10
      );
      userUpdates.password_user = hashedPassword;

      const updateUser: UserWithAge[] = await this.userRepository.putUser(
        userUpdates,
        id_user
      );

      if (!updateUser || updateUser.length === 0) {
        throw new CustomError("Usuário não encontrado para atualização.", 404);
      }

      return updateUser[0] as UserWithAge;
    } catch (error: any) {
      if (error.original?.code === "23505") {
        throw new CustomError(
          "Este email já está sendo utilizado por outro usuário!",
          409
        );
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError("Erro ao atualizar usuário.", 500);
    }
  };

  deleteUserWithoudPost = async (): Promise<UserWithAge[]> => {
    try {
      const users: UserWithAge[] =
        await this.userRepository.deleteUserWithoudPost();

      if (!users || users.length === 0) {
        throw new CustomError(
          "Nenhum usuário que não seja administrador encontrado inativo!",
          404
        );
      }

      return users as UserWithAge[];
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        error.message || "Erro ao consultar usuários!",
        500
      );
    }
  };
}
