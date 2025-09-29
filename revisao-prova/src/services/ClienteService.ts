import { ClienteRepository } from "../repositories/ClienteRepository";
import { CustomError } from "../errors/CustomError";

export class ClienteService {
  private clienteRepository = new ClienteRepository();

  getClienteBuyCategoria = async (idCat: number) => {
    try {
      const clientes = await this.clienteRepository.getClienteBuyCategoria(
        idCat
      );

      if (!clientes || clientes.length === 0) {
        throw new CustomError("Não foi possivel retornar nenhum cliente!", 404);
      }

      return clientes;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };

  getClientePedidoUnique = async () => {
    try {
      const clientes = await this.clienteRepository.getClientePedidoUnique();

      if (!clientes || clientes.length === 0) {
        throw new CustomError("Não foi possivel retornar nenhum cliente!", 404);
      }

      return clientes;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };

  getRelatorioCliente = async () => {
    try {
      const relatorio = await this.clienteRepository.getRelatorioCliente();

      if (!relatorio || relatorio.length === 0) {
        throw new CustomError(
          "Não foi possivel retornar nenhum relatorio!",
          404
        );
      }

      return relatorio;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };
}
