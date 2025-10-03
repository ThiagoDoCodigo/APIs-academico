import sequelize from "../data/database";
import {
  UserWithAge,
  UserPost,
  UserUpdates,
  GetPermition,
  CheckUserById,
} from "../types/UserType";
import { QueryTypes } from "sequelize";
import { CustomError } from "../errors/CustomError";

export class UserRepository {
  getUsersAll = async (): Promise<UserWithAge[]> => {
    const querySql = `
    SELECT 
      id_user, 
      name_user, 
      email_user, 
      role_user, 
      TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
      EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user
    FROM users
    ORDER BY id_user;
  `;

    try {
      const listUsers = await sequelize.query<UserWithAge>(querySql, {
        type: QueryTypes.SELECT,
      });

      return listUsers;
    } catch (error: any) {
      throw error;
    }
  };

  getPermitionUser = async (id_user: number): Promise<GetPermition[]> => {
    const querySql = `
      SELECT role_user FROM users WHERE id_user = :id_user;
    `;

    try {
      const result = await sequelize.query<GetPermition>(querySql, {
        replacements: { id_user },
        type: QueryTypes.SELECT,
      });

      return result as GetPermition[];
    } catch (error: any) {
      throw error;
    }
  };

  checkUser = async (id_user: number): Promise<CheckUserById[]> => {
    const querySql = `
      SELECT id_user FROM users WHERE id_user = :id_user;
    `;

    try {
      const result = await sequelize.query<CheckUserById>(querySql, {
        replacements: { id_user },
        type: QueryTypes.SELECT,
      });

      return result as CheckUserById[];
    } catch (error: any) {
      throw error;
    }
  };

  getUserById = async (id_user: number): Promise<UserWithAge[]> => {
    const querySql = `
      SELECT 
        id_user, 
        name_user, 
        email_user, 
        role_user, 
        TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
        EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user
      FROM users
      WHERE id_user = :id_user;
    `;

    try {
      const listUsers = await sequelize.query<UserWithAge>(querySql, {
        replacements: { id_user },
        type: QueryTypes.SELECT,
      });

      return listUsers as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };

  getUsersByName = async (name_user: string): Promise<UserWithAge[]> => {
    const querySql = `
      SELECT 
        id_user, 
        name_user, 
        email_user, 
        role_user, 
        TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
        EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user
      FROM users
      WHERE name_user ILIKE :name_user
      ORDER BY id_user;
    `;

    const likeParam = `%${name_user.trim()}%`;

    try {
      const listUsers = await sequelize.query<UserWithAge>(querySql, {
        replacements: { name_user: likeParam },
        type: QueryTypes.SELECT,
      });

      return listUsers as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };

  getUsersByAgeBetween = async (
    minAge: number,
    maxAge: number
  ): Promise<UserWithAge[]> => {
    const querySql = `
      SELECT 
        id_user, 
        name_user, 
        email_user, 
        role_user, 
        TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
        EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user
      FROM users
      WHERE EXTRACT(YEAR FROM AGE(nasc_user)) BETWEEN :minAge AND :maxAge
      ORDER BY id_user;
    `;

    try {
      const listUsers = await sequelize.query<UserWithAge>(querySql, {
        replacements: { minAge, maxAge },
        type: QueryTypes.SELECT,
      });

      return listUsers as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };

  createUser = async (newUser: UserPost): Promise<UserWithAge[]> => {
    const querySql = `
      INSERT INTO users (name_user, email_user, role_user, nasc_user, password_user)
      VALUES (:name_user, :email_user, :role_user, :nasc_user, :password_user)
      RETURNING id_user, name_user, email_user, role_user, TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user, EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user;
    `;

    try {
      const result = await sequelize.query<UserWithAge>(querySql, {
        replacements: {
          name_user: newUser.name_user.trim(),
          email_user: newUser.email_user.trim(),
          role_user: newUser.role_user,
          nasc_user: newUser.nasc_user.trim(),
          password_user: newUser.password_user,
        },
        type: QueryTypes.SELECT,
      });

      return result as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };

  putUser = async (
    userUpdates: UserUpdates,
    id_user: number
  ): Promise<UserWithAge[]> => {
    const querySql = `
    UPDATE users
    SET 
      name_user = :name_user,
      email_user = :email_user,
      role_user = :role_user,
      nasc_user = :nasc_user,
      password_user = :password_user
    WHERE id_user = :id_user
    RETURNING 
      id_user, 
      name_user, 
      email_user, 
      role_user,
      TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
      EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user;
  `;

    try {
      const result = await sequelize.query<UserWithAge>(querySql, {
        replacements: {
          name_user: userUpdates.name_user.trim(),
          email_user: userUpdates.email_user.trim(),
          role_user: userUpdates.role_user,
          nasc_user: userUpdates.nasc_user.trim(),
          password_user: userUpdates.password_user,
          id_user,
        },
        type: QueryTypes.SELECT,
      });

      return result as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };

  deleteUserWithoudPost = async (): Promise<UserWithAge[]> => {
    const querySql = `
    DELETE FROM users
    WHERE id_user NOT IN (SELECT id_user FROM posts) AND role_user = 'user'
    RETURNING 
      id_user, 
      name_user, 
      email_user, 
      role_user,
      TO_CHAR(nasc_user, 'DD/MM/YYYY') AS nasc_user,
      EXTRACT(YEAR FROM AGE(nasc_user)) AS age_user;
  `;

    try {
      const result = await sequelize.query<UserWithAge>(querySql, {
        type: QueryTypes.SELECT,
      });

      return result as UserWithAge[];
    } catch (error: any) {
      throw error;
    }
  };
}
