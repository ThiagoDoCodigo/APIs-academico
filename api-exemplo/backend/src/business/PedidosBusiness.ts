import { PedidosModel } from "../models/PedidosModel";

export class PedidosBusiness {
  static produtosPorCliente(idCliente: number) {
    const pedidos = PedidosModel.getPedidos().filter(
      (p) => p.cliente === idCliente
    );
    const produtosComprados = pedidos.flatMap((pedido) =>
      pedido.produtos.map((idProduto) =>
        PedidosModel.getProdutos().find((prod) => prod.id === idProduto)
      )
    );
    return produtosComprados;
  }

  static clientesPorCategoria(idCategoria: number) {
    const pedidos = PedidosModel.getPedidos();
    const clientesSet = new Set<number>();

    pedidos.forEach((pedido) => {
      pedido.produtos.forEach((idProduto) => {
        const produto = PedidosModel.getProdutos().find(
          (prod) => prod.id === idProduto
        );
        if (produto?.categorias.includes(idCategoria)) {
          clientesSet.add(pedido.cliente);
        }
      });
    });

    return Array.from(clientesSet).map((id) =>
      PedidosModel.getClientes().find((c) => c.id === id)
    );
  }

  static clientesComUmItem() {
    const pedidos = PedidosModel.getPedidos();
    const clientesSet = new Set<number>();

    pedidos.forEach((pedido) => {
      if (pedido.produtos.length === 1) clientesSet.add(pedido.cliente);
    });

    return Array.from(clientesSet).map((id) =>
      PedidosModel.getClientes().find((c) => c.id === id)
    );
  }

  static removerPedidosPorClienteECategoria(
    idCliente: number,
    idCategoria: number
  ) {
    const pedidos = PedidosModel.getPedidos().filter(
      (p) => p.cliente === idCliente
    );

    pedidos.forEach((pedido) => {
      const produtosParaRemover = pedido.produtos.filter((idProduto) => {
        const produto = PedidosModel.getProdutos().find(
          (p) => p.id === idProduto
        );
        return produto?.categorias.includes(idCategoria);
      });

      produtosParaRemover.forEach((idProduto) => {
        const index = pedido.produtos.indexOf(idProduto);
        if (index !== -1) pedido.produtos.splice(index, 1);
      });
    });
  }
}
