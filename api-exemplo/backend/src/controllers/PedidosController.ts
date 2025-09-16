import { Request, Response } from "express";
import { PedidosBusiness } from "../business/PedidosBusiness";

export class PedidosController {
  static produtosPorCliente(req: Request, res: Response) {
    const idCliente = Number(req.params.idCliente);
    const produtos = PedidosBusiness.produtosPorCliente(idCliente);
    res.json(produtos);
  }

  static clientesPorCategoria(req: Request, res: Response) {
    const idCategoria = Number(req.params.idCategoria);
    const clientes = PedidosBusiness.clientesPorCategoria(idCategoria);
    res.json(clientes);
  }

  static clientesComUmItem(req: Request, res: Response) {
    const clientes = PedidosBusiness.clientesComUmItem();
    res.json(clientes);
  }

  static removerPedidosPorClienteECategoria(req: Request, res: Response) {
    const idCliente = Number(req.params.idCliente);
    const idCategoria = Number(req.params.idCategoria);
    PedidosBusiness.removerPedidosPorClienteECategoria(idCliente, idCategoria);
    res.json({ msg: "Pedidos removidos com sucesso" });
  }
}
