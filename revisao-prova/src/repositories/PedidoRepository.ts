import { pedidos, produtos } from "../db";

export class PedidoRepository {
  deletePedidoByCatAndCliente = async (idCat: number, idCliente: number) => {
    const produtosFilter = produtos.filter((p) => p.categorias.includes(idCat));
    const idsProdutos = produtosFilter.flatMap((p) => p.id);

    const pedidosDelete = pedidos.filter(
      (p) =>
        p.produtos.some((id) => idsProdutos.includes(id)) &&
        p.cliente === idCliente
    );

    const idsPedidosDelete = pedidosDelete.flatMap((p) => p.id);

    for (const id of idsPedidosDelete) {
      const index = pedidos.findIndex((p) => p.id === id);
      if (index !== -1) {
        pedidos.splice(index, 1);
      }
    }

    return pedidosDelete;
  };
}
