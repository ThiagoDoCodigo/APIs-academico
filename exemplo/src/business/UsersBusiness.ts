import { UsersData } from "../data/UsersData";

export class UserBusiness {
  usersData = new UsersData();
  async usersGetAll() {
    try {
      const users = await this.usersData.usersGetAll();

      if (!users || users.length === 0) {
        throw new Error("Lista esta vazia!");
      }
      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
