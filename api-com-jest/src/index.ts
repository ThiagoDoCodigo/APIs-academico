import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;

const app: Application = express();
app.use(cors());
app.use(express.json());

//Rotas de usuarios:
import userRouter from "./routes/UserRouter";
app.use("/users", userRouter);

//Rotas de posts:
import postRouter from "./routes/PostRouter";
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost/${PORT}`);
});
