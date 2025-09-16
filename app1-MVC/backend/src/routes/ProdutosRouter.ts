import { Router } from "express";
import { ProdutosController } from "../controller/ProdutosController";

const router: Router = Router();

router.get("/produtosCliente/:id", ProdutosController.produtosCliente);
router.get(
  "/Produtos/categoria/search",
  ProdutosController.produtosIncludesCategoria
);

export default router;
