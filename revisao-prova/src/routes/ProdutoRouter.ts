import { Router, Request, Response } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
const produtoController = new ProdutoController();

const router: Router = Router();

router.get("/idCliente/:id", (req: Request, res: Response) =>
  produtoController.getProductsByCliente(req, res)
);

router.get("/search", (req: Request, res: Response) =>
  produtoController.getProdutosBySearch(req, res)
);

export default router;
