import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { CustomError } from "../errors/CustomError";

export class ProdutoService {
  private produtoRepository = new ProdutoRepository();
  getProductsByCliente = async (idCliente: number) => {
    try {
      const produtosByCliente =
        await this.produtoRepository.getProductsByCliente(idCliente);

      if (!produtosByCliente || produtosByCliente.length === 0) {
        throw new CustomError(
          "Não foi possivel encontrar nenhum produto!",
          404
        );
      }

      return produtosByCliente;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };

  getProdutosBySearch = async (search: string) => {
    try {
      const produtosFilter = await this.produtoRepository.getProdutosBySearch(
        search
      );

      if (!produtosFilter || produtosFilter.length === 0) {
        throw new CustomError(
          "Não foi possivel encontrar nenhum produto!",
          404
        );
      }

      return produtosFilter;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro interno no server", 500);
    }
  };
}
