import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;

const app: Application = express();
app.use(cors());
app.use(express.json());

import produtoRouter from "./routes/ProdutoRouter";

app.use("/produtos/", produtoRouter);

import clienteRouter from "./routes/ClienteRouter";

app.use("/clientes/", clienteRouter);

import pedidoRouter from "./routes/PedidoRouter";

app.use("/pedidos/", pedidoRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
