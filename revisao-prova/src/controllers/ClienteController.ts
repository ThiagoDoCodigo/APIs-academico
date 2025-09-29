import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  private clienteService = new ClienteService();

  getClienteBuyCategoria = async (req: Request, res: Response) => {
    try {
      const idCat = Number(req.params.id);

      if (!Number.isInteger(idCat) || idCat < 1) {
        return res.status(400).json({
          message: "O campo ID da categoria é inválido!",
          success: false,
        });
      }

      const clientes = await this.clienteService.getClienteBuyCategoria(idCat);
      return res
        .status(200)
        .json({ clientes: clientes.map((c) => c.nome), success: true });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  };

  getClientePedidoUnique = async (req: Request, res: Response) => {
    try {
      const clientes = await this.clienteService.getClientePedidoUnique();
      return res
        .status(200)
        .json({ clientes: clientes.map((c) => c.nome), success: true });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  };

  getRelatorioCliente = async (req: Request, res: Response) => {
    try {
      const relatorio = await this.clienteService.getRelatorioCliente();
      return res.status(200).json({ relatorio: relatorio, success: true });
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
