import { Router, Request, Response } from "express";
import { ClienteController } from "../controllers/ClienteController";
const clienteController = new ClienteController();

const router: Router = Router();

router.get("/categoria/:id", (req: Request, res: Response) =>
  clienteController.getClienteBuyCategoria(req, res)
);

router.get("/pedidosUnique", (req: Request, res: Response) =>
  clienteController.getClientePedidoUnique(req, res)
);

router.get("/relatorio", (req: Request, res: Response) =>
  clienteController.getRelatorioCliente(req, res)
);

export default router;
