import { promises as fs } from "fs";
import path from "path";
import { User, UserWithAge } from "../types/User";
import { CustomError } from "../errors/CustomError";
const dataLocal: string = "../db.json";
const filePath = path.join(__dirname, dataLocal);

export class UsersData {
  calcularIdade = (nasc: string): number => {
    const birthDate = new Date(nasc);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  async getUsersAll(): Promise<UserWithAge[]> {
    const dataUsers = await fs.readFile(filePath, "utf-8");
    const users: User[] = JSON.parse(dataUsers);

    const usersWithAge: UserWithAge[] = users.map((user) => ({
      ...user,
      age: this.calcularIdade(user.nasc),
    }));

    return usersWithAge;
  }

  async addUser(
    newUser: Omit<User, "id">,
    users: UserWithAge[]
  ): Promise<UserWithAge> {
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const usersToSave: User[] = users.map(({ age, ...rest }) => rest);

    const userAdd: User = {
      id: newId,
      ...newUser,
    };

    usersToSave.push(userAdd);
    await fs.writeFile(filePath, JSON.stringify(usersToSave, null, 2), "utf-8");

    return {
      ...userAdd,
      age: this.calcularIdade(newUser.nasc),
    };
  }

  async putUser(
    userUpdates: Omit<User, "id">,
    users: UserWithAge[],
    id: number
  ): Promise<UserWithAge> {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new CustomError("Usuário não encontrado!", 404);
    }

    const updatedUser = {
      ...users[index],
      ...userUpdates,
    };

    users[index] = updatedUser;
    const usersToSave: User[] = users.map(({ age, ...rest }) => rest);

    await fs.writeFile(filePath, JSON.stringify(usersToSave, null, 2), "utf-8");

    return {
      ...updatedUser,
      age: this.calcularIdade(updatedUser.nasc),
    };
  }

  async deleteInativesUsers(
    idsUser: number[],
    users: UserWithAge[]
  ): Promise<UserWithAge[]> {
    const deletedUsers: UserWithAge[] = users.filter((user) =>
      idsUser.includes(user.id)
    );

    const usersActives: UserWithAge[] = users.filter(
      (user) => !idsUser.includes(user.id)
    );

    const usersToSave: User[] = usersActives.map(({ age, ...rest }) => rest);

    await fs.writeFile(filePath, JSON.stringify(usersToSave, null, 2), "utf-8");

    return deletedUsers;
  }
}
