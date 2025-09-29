import { produtos } from "../db";
import { pedidos } from "../db";

export class ProdutoRepository {
  getProductsByCliente = async (idCliente: number) => {
    const pedidosByCliente = pedidos.filter((p) => p.cliente === idCliente);
    const idsProdutos = pedidosByCliente.flatMap((p) => p.produtos);
    const idsProdutosUnique = [...new Set(idsProdutos)];

    const produtosByCliente = produtos.filter((p) =>
      idsProdutosUnique.includes(p.id)
    );

    return produtosByCliente;
  };

  getProdutosBySearch = async (search: string) => {
    const produtosFilter = produtos.filter((p) =>
      p.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    return produtosFilter;
  };
}
