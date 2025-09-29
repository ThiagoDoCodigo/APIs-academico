import { ProdutoService } from "../services/ProdutoService";
import { CustomError } from "../errors/CustomError";
import { Request, Response } from "express";

export class ProdutoController {
  private produtoService = new ProdutoService();

  getProductsByCliente = async (req: Request, res: Response) => {
    try {
      const idCliente = Number(req.params.id);

      if (!Number.isInteger(idCliente) || idCliente < 1) {
        return res.status(400).json({
          message: "O campo ID do cliente é inválido!",
          success: false,
        });
      }

      const produtosByCliente = await this.produtoService.getProductsByCliente(
        idCliente
      );
      return res.status(200).json({
        produtos: produtosByCliente.map((p) => p.nome),
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  };

  getProdutosBySearch = async (req: Request, res: Response) => {
    try {
      const search = req.query.search as string;

      if (!search || search.trim() === "") {
        return res.status(400).json({
          message: "O campo search é inválido!",
          success: false,
        });
      }

      const produtosFilter = await this.produtoService.getProdutosBySearch(
        search
      );
      return res.status(200).json({
        produtos: produtosFilter.map((p) => p.nome),
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  };
}
