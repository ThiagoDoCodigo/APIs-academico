import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;

const app: Application = express();
app.use(cors());
app.use(express.json());

//Rotas de usuarios:
import usersRouter from "./routes/UsersRouter";
app.use("/users", usersRouter);

//Rotas de posts:
import postRouter from "./routes/PostRouter";
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost/${PORT}`);
});
