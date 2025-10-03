import { Sequelize } from "sequelize";
import "dotenv/config";

const banco: string = process.env.BANCO!;
const user: string = process.env.USER!;
const password: string = process.env.PASSWORD!;
const host: string = process.env.HOST!;
const port: number = Number(process.env.DB_PORT!);

const sequelize = new Sequelize(banco, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
