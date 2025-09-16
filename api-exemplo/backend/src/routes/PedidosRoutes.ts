import { Router } from "express";
import { PedidosController } from "../controllers/PedidosController";

const router = Router();

router.get(
  "/produtos/cliente/:idCliente",
  PedidosController.produtosPorCliente
);
router.get(
  "/clientes/categoria/:idCategoria",
  PedidosController.clientesPorCategoria
);
router.get("/clientes/um-item", PedidosController.clientesComUmItem);
router.delete(
  "/pedidos/:idCliente/categoria/:idCategoria",
  PedidosController.removerPedidosPorClienteECategoria
);

export default router;
