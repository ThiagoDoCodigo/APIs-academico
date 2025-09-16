import { ProdutosBusiness } from "../business/ProdutosBusiness";
import { Request, Response } from "express";

export class ProdutosController {
  static produtosCliente(req: Request, res: Response) {
    try {
      const idCliente = parseInt(req.params?.id);
      if (!idCliente) {
        return res
          .status(400)
          .json({ message: "Campo id do cliente não foi enviado!" });
      }

      const produtosClienteFilter = ProdutosBusiness.produtosCliente(idCliente);

      if (typeof produtosClienteFilter === "string") {
        return res.status(404).json({
          message: produtosClienteFilter,
        });
      }

      return res.status(200).json(produtosClienteFilter.map((p) => p.nome));
    } catch (error) {
      console.error("Erro ao procurar produtos do cliente: ", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static produtosIncludesCategoria(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      if (!search || search.trim() === "") {
        return res
          .status(400)
          .json({ message: "Nome inválido ou não foi enviado!" });
      }

      const produtosCat = ProdutosBusiness.produtosIncludesCategoria(search);

      if (typeof produtosCat === "string") {
        return res.status(404).json({
          message: produtosCat,
        });
      }

      res.status(200).json(produtosCat);
    } catch (error) {
      console.error("Erro ao procurar produtos: ", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
