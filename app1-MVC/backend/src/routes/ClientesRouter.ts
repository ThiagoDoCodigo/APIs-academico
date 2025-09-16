import { Router } from "express";
import { ClientesController } from "../controller/ClientesController";

const router: Router = Router();

router.get("/clientes", ClientesController.listarClientes);
router.post("/cliente", ClientesController.adicionarCliente);
router.get("/clientesCategoria/:id", ClientesController.clientesCategoria);
router.get("/clientesPedidosUnicos", ClientesController.clientesPedidosUnicos);
router.get("/relatoriosClientes", ClientesController.relatoriosClientes);

export default router;
