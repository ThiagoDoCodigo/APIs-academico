import { Request, Response } from "express";
import { PedidoService } from "../services/PedidoService";
import { CustomError } from "../errors/CustomError";

export class PedidoController {
  private pedidoService = new PedidoService();

  deletePedidoByCatAndCliente = async (req: Request, res: Response) => {
    try {
      const idCat = Number(req.params.idCat);
      const idCliente = Number(req.params.idCliente);

      if (!Number.isInteger(idCat) || idCat < 1) {
        return res.status(400).json({
          message: "O campo ID da categoria é inválido!",
          success: false,
        });
      }

      if (!Number.isInteger(idCliente) || idCliente < 1) {
        return res.status(400).json({
          message: "O campo ID do cliente é inválido!",
          success: false,
        });
      }

      const pedidosDelete =
        await this.pedidoService.deletePedidoByCatAndCliente(idCat, idCliente);

      return res.status(200).json({ pedidos: pedidosDelete, success: true });
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
