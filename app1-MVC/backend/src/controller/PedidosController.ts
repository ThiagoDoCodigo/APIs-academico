import { PedidosBusiness } from "../business/PedidosBusiness";
import { Request, Response } from "express";

export class PedidosController {
  static deletePedidosByCategoriaAndCliente(req: Request, res: Response) {
    try {
      const idCliente = parseInt(req.params.idCliente);
      const idCategoria = parseInt(req.params.idCategoria);

      if (!idCliente || isNaN(idCliente)) {
        return res
          .status(400)
          .json({ message: "ID do cliente inválido ou não enviado!" });
      }

      if (!idCategoria || isNaN(idCategoria)) {
        return res
          .status(400)
          .json({ message: "ID do cliente inválido ou não enviado!" });
      }

      const pedidosExcluidos =
        PedidosBusiness.deletePedidoByCategoriaAndCliente(
          idCliente,
          idCategoria
        );

      if (typeof pedidosExcluidos === "string") {
        return res.status(404).json({ message: pedidosExcluidos });
      }

      return res.status(200).json(pedidosExcluidos);
    } catch (error) {
      console.error("Erro ao excluir pedidos: ", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
