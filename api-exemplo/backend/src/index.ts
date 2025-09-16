import express, { Application } from "express";
import cors from "cors";
import pedidosRoutes from "./routes/PedidosRoutes";

const app: Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
