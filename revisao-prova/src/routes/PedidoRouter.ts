import { Router, Request, Response } from "express";
import { PedidoController } from "../controllers/PedidoController";
const pedidoController = new PedidoController();

const router: Router = Router();

router.delete("/delete/:idCat/:idCliente", (req: Request, res: Response) =>
  pedidoController.deletePedidoByCatAndCliente(req, res)
);

export default router;
