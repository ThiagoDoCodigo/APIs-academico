import { pedidos, clientes, produtos, categorias } from "../db";

export class PedidosModel {
  static getPedidos() {
    return pedidos;
  }

  static getClientes() {
    return clientes;
  }

  static getProdutos() {
    return produtos;
  }

  static getCategorias() {
    return categorias;
  }

  static removePedido(id: number) {
    const index = pedidos.findIndex((p) => p.id === id);
    if (index !== -1) pedidos.splice(index, 1);
  }
}
