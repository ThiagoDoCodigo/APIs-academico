import { UsersData } from "../data/UsersData";
import { CustomError } from "../errors/CustomError";
import { User, UserWithAge } from "../types/User";
import { PostBusiness } from "./PostBusiness";

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.role === "string" &&
    typeof obj.password === "string" &&
    typeof obj.nasc === "string"
  );
}

export class UsersBusiness {
  private userData!: UsersData;
  private postBusiness!: PostBusiness;

  constructor(userData?: UsersData, postBusiness?: PostBusiness) {
    if (userData) this.userData = userData;
    if (postBusiness) this.postBusiness = postBusiness;
  }

  async setUserData(userData: UsersData) {
    this.userData = userData;
  }

  async setPostBusiness(postBusiness: PostBusiness) {
    this.postBusiness = postBusiness;
  }

  async getUsersAll(): Promise<UserWithAge[]> {
    try {
      const users: UserWithAge[] = await this.userData.getUsersAll();

      if (!Array.isArray(users)) {
        throw new Error("Formato inválido: esperado um array de usuários.");
      }

      const invalidUsers = users.filter((user) => !isUser(user));
      if (invalidUsers.length > 0) {
        console.warn("Usuários inválidos encontrados:", invalidUsers);
        throw new CustomError("JSON contém usuários inválidos!", 400);
      }

      if (!users || users.length === 0) {
        throw new CustomError(
          "Lista de usuários está vazia ou não existe!",
          404
        );
      }

      return users;
    } catch (error: any) {
      throw new CustomError(error.message || "Erro interno no servidor!", 500);
    }
  }

  async getUserById(id: number): Promise<UserWithAge> {
    try {
      const users: UserWithAge[] = await this.getUsersAll();

      const userFind = users.find((u) => u?.id === id);

      if (!userFind) {
        throw new CustomError("Usuário não encontrado!", 404);
      }

      return userFind;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async getUsersBySearch(search: string): Promise<UserWithAge[]> {
    try {
      const users: UserWithAge[] = await this.getUsersAll();

      const userFilter = users.filter((u) =>
        u?.name.trim().toLowerCase().includes(search.toLowerCase())
      );

      if (userFilter.length === 0) {
        throw new CustomError("Nenhum usuário encontrado!", 404);
      }

      return userFilter;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async getUsersByAgeBetween(min: number, max: number): Promise<UserWithAge[]> {
    try {
      const users: UserWithAge[] = await this.getUsersAll();

      const userFilter = users.filter((u) => u.age >= min && u.age <= max);

      if (userFilter.length === 0) {
        throw new CustomError("Nenhum usuário encontrado!", 404);
      }

      return userFilter;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  verificarEmail = (email: string, users: UserWithAge[]): boolean => {
    if (users.some((u) => u.email === email)) {
      return false;
    }

    return true;
  };

  verificarEmailUpdate = (
    email: string,
    users: UserWithAge[],
    id: number
  ): boolean => {
    if (users.some((u) => u.email === email && u.id !== id)) {
      return false;
    }

    return true;
  };

  async addUser(newUser: Omit<User, "id">): Promise<UserWithAge> {
    try {
      const users: UserWithAge[] = await this.getUsersAll();
      if (!newUser.name || newUser.name.trim() === "") {
        throw new CustomError("O campo nome é obrigatório!", 400);
      }

      if (!newUser.email || newUser.email.trim() === "") {
        throw new CustomError("O campo email é obrigatório!", 400);
      }

      if (!newUser.email.includes("@")) {
        throw new CustomError("Email inválido!", 409);
      }

      if (!this.verificarEmail(newUser.email, users)) {
        throw new CustomError("Email já cadastrado!", 409);
      }

      if (!newUser.role || newUser.role.trim() === "") {
        throw new CustomError("O campo de permissão é obrigatório!", 400);
      }

      if (!newUser.password || newUser.password.trim() === "") {
        throw new CustomError("O campo senha é obrigatório!", 400);
      }

      if (!newUser.nasc || newUser.nasc.trim() === "") {
        throw new CustomError("O campo nascimento é obrigatório!", 400);
      }

      const createUser = await this.userData.addUser(newUser, users);
      return createUser;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async putUser(
    userUpdates: Omit<User, "id">,
    id: number
  ): Promise<UserWithAge> {
    try {
      const users: UserWithAge[] = await this.getUsersAll();

      const existingUser = users.find((u) => u.id === id);
      if (!existingUser) {
        throw new CustomError("Usuário não encontrado!", 404);
      }

      if (!userUpdates.name || userUpdates.name.trim() === "") {
        throw new CustomError("O campo nome é obrigatório!", 400);
      }

      if (!userUpdates.email || userUpdates.email.trim() === "") {
        throw new CustomError("O campo email é obrigatório!", 400);
      }

      if (!userUpdates.email.includes("@")) {
        throw new CustomError("Email inválido!", 409);
      }

      if (!this.verificarEmailUpdate(userUpdates.email, users, id)) {
        throw new CustomError("Email já cadastrado!", 409);
      }
      if (!userUpdates.role || userUpdates.role.trim() === "") {
        throw new CustomError("O campo de permissão é obrigatório!", 400);
      }

      if (!userUpdates.password || userUpdates.password.trim() === "") {
        throw new CustomError("O campo senha é obrigatório!", 400);
      }

      if (!userUpdates.nasc || userUpdates.nasc.trim() === "") {
        throw new CustomError("O campo nascimento é obrigatório!", 400);
      }

      const updatedUser = await this.userData.putUser(userUpdates, users, id);
      return updatedUser;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async deleteInativesUsers(): Promise<UserWithAge[]> {
    try {
      const users = await this.getUsersAll();
      const posts = await this.postBusiness.getPostAll();

      const usersInatives = users.filter(
        (user) =>
          user.role !== "admin" &&
          !posts.some((post) => post.authorId === user.id)
      );

      if (usersInatives.length === 0) {
        throw new CustomError(
          "Nenhum usuário inativo que não seja um administrador!",
          404
        );
      }

      const idsInatives = usersInatives.map((user) => user.id);

      const deletedUsers = await this.userData.deleteInativesUsers(
        idsInatives,
        users
      );
      return deletedUsers;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }
}
