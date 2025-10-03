import { DataTypes, Model } from "sequelize";
import sequelize from "../data/database";
import { User } from "./User";

export class Post extends Model {
  public id_post!: number;
  public id_user!: number;
  public createddate!: Date;
  public title_post!: string;
  public content_post!: string;
  public published!: boolean;
}

Post.init(
  {
    id_post: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    title_post: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    content_post: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 9999999999],
      },
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: false,
  }
);

Post.belongsTo(User, { foreignKey: "id_user", as: "usuario" });
User.hasMany(Post, { foreignKey: "id_user", as: "posts" });
