import { categorias, clientes, pedidos, produtos } from "../db";

export class ClienteRepository {
  getClienteBuyCategoria = async (idCat: number) => {
    const produtosByCat = produtos.filter((p) => p.categorias.includes(idCat));
    const idsProdutos = produtosByCat.flatMap((p) => p.id);

    const pedidosByProdutos = pedidos.filter((p) =>
      p.produtos.some((id) => idsProdutos.includes(id))
    );

    const idsClientes = pedidosByProdutos.flatMap((p) => p.cliente);
    const idsClientesUnique = [...new Set(idsClientes)];

    const clientesFilter = clientes.filter((c) =>
      idsClientesUnique.includes(c.id)
    );

    return clientesFilter;
  };

  getClientePedidoUnique = async () => {
    const pedidosUnique = pedidos.filter((p) => p.produtos.length === 1);

    const idsClientes = pedidosUnique.flatMap((p) => p.cliente);
    const idsClientesUnique = [...new Set(idsClientes)];

    const clientesFilter = clientes.filter((c) =>
      idsClientesUnique.includes(c.id)
    );

    return clientesFilter;
  };

  getRelatorioCliente = async () => {
    const relatorio = clientes.map((cliente) => {
      const pedidosFilter = pedidos.filter((p) => p.cliente === cliente.id);
      const totalPedidos = pedidosFilter.length;

      const idsProdutos = pedidosFilter.flatMap((p) => p.produtos);
      const idsProdutosUnique = [...new Set(idsProdutos)];
      const totalItems = idsProdutosUnique.length;

      const produtosFilter = produtos.filter((p) =>
        idsProdutosUnique.includes(p.id)
      );

      const idsCat = produtosFilter.flatMap((p) => p.categorias);
      const idsCatUnique = [...new Set(idsCat)];
      const totalCat = idsCatUnique.length;

      const catFilter = categorias.filter((c) => idsCatUnique.includes(c.id));

      return {
        nome: cliente.nome,
        totalPedidos: pedidosFilter ? totalPedidos : 0,
        totalItems: pedidosFilter ? totalItems : 0,
        produtos: pedidosFilter ? produtosFilter.map((p) => p.nome) : "",
        totalCat: pedidosFilter ? totalCat : 0,
        categorias: pedidosFilter ? catFilter.map((c) => c.nome) : "",
      };
    });

    return relatorio;
  };
}
