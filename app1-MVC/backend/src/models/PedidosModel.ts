import { pedidos } from "../data/data";

export class PedidosModel {
  static getPedidos() {
    return pedidos;
  }

  static deletePedidos(ids: number[]) {
    if (!ids || ids.length === 0) return;

    const excluidos = [];

    for (let i = pedidos.length - 1; i >= 0; i--) {
      if (ids.includes(pedidos[i].id)) {
        excluidos.push(pedidos[i]);
        pedidos.splice(i, 1);
      }
    }

    return excluidos;
  }
}
