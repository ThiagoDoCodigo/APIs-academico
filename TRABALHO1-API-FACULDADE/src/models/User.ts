import { DataTypes, Model } from "sequelize";
import sequelize from "../data/database";

export class User extends Model {
  public id_user!: number;
  public name_user!: string;
  public email_user!: string;
  public role_user!: "admin" | "user";
  public nasc_user!: Date;
  public password_user!: string;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_user: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role_user: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
    nasc_user: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);
