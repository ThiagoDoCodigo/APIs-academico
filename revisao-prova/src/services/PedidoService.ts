import { PedidoRepository } from "../repositories/PedidoRepository";
import { CustomError } from "../errors/CustomError";

export class PedidoService {
  private pedidoRepository = new PedidoRepository();

  deletePedidoByCatAndCliente = async (idCat: number, idCliente: number) => {
    try {
      const pedidosDelete =
        await this.pedidoRepository.deletePedidoByCatAndCliente(
          idCat,
          idCliente
        );

      if (!pedidosDelete || pedidosDelete.length === 0) {
        throw new CustomError("Nenhum pedido foi deletado!", 404);
      }
      return pedidosDelete;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };
}
