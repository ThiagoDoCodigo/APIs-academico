import { PedidosModel } from "../models/PedidosModel";
import { ProdutosModel } from "../models/ProdutosModel";

export class PedidosBusiness {
  static deletePedidoByCategoriaAndCliente(
    idCliente: number,
    idCategoria: number
  ) {
    if (!idCliente || isNaN(idCliente)) {
      return "O campo cliente não foi enviado corretamente!";
    }

    if (!idCategoria || isNaN(idCategoria)) {
      return "O campo categoria não foi enviado corretamente!";
    }

    const produtos = ProdutosModel.getProdutos();
    if (!produtos || produtos.length === 0) {
      return "Ainda não há produtos cadastrados!";
    }

    const pedidos = PedidosModel.getPedidos();
    if (!pedidos || pedidos.length === 0) {
      return "Ainda não há pedidos cadastrados!";
    }

    const produtosFiltrados = produtos.filter((p) =>
      p.categorias.includes(idCategoria)
    );

    if (produtosFiltrados.length === 0) {
      return "Ainda não há produtos cadastrados nesta categoria!";
    }

    const idsProdutos = produtosFiltrados.flatMap((p) => p.id);

    const pedidosExcluidos = pedidos.filter(
      (p) =>
        p.cliente === idCliente &&
        p.produtos.some((id) => idsProdutos.includes(id))
    );

    if (pedidosExcluidos.length === 0) {
      return "Ainda não há pedidos com os requisitos para serem deletados!";
    }

    PedidosModel.deletePedidos(pedidosExcluidos.flatMap((p) => p.id));

    return pedidosExcluidos.flatMap((p) => p.id);
  }
}
