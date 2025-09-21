import { Users } from "../db";

export class UsersData {
  async usersGetAll() {
    const users = Users;
    return users;
  }
}
