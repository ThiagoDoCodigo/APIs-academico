import { PedidosController } from "../controller/PedidosController";
import { Router } from "express";

const router: Router = Router();

router.delete(
  "/deletePedido/:idCliente/:idCategoria",
  PedidosController.deletePedidosByCategoriaAndCliente
);

export default router;
