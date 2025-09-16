import { ClientesModel } from "../models/ClientesModel";
import { ProdutosModel } from "../models/ProdutosModel";
import { PedidosModel } from "../models/PedidosModel";
import { CategoriasModel } from "../models/CategoriasModel";

export class ClientesBusiness {
  static listaClientes() {
    const clientes = ClientesModel.getClientes();
    if (!clientes || clientes.length === 0) {
      return null;
    }
    return clientes;
  }

  static adicionarCliente(nome: string) {
    const cliente = ClientesModel.addCliente(nome);
    if (!cliente) {
      return null;
    }
    return cliente;
  }

  static clientesCategoria(id: number) {
    const clientes = ClientesModel.getClientes();
    if (!clientes || clientes.length === 0) {
      return "Não há clientes cadastrados!";
    }

    const produtos = ProdutosModel.getProdutos();
    if (!produtos || produtos.length === 0) {
      return "Ainda não há produtos cadastrados!";
    }

    const pedidos = PedidosModel.getPedidos();
    if (!pedidos || pedidos.length === 0) {
      return "Ainda não há pedidos cadastrados!";
    }

    const produtosCategoria = produtos.filter((p) => p.categorias.includes(id));
    if (produtosCategoria.length === 0) {
      return "Ainda não há produtos desta categoria cadastrados!";
    }

    const idsProdutos = produtosCategoria.flatMap((p) => p.id);

    const pedidosCategoria = pedidos.filter((p) =>
      p.produtos.some((idProduto) => idsProdutos.includes(idProduto))
    );
    if (pedidosCategoria.length === 0) {
      return "Ainda não há pedidos com produtos desta categoria cadastrados!";
    }

    const idsClientes = pedidosCategoria.flatMap((p) => p.cliente);
    const clientesUnicos = [...new Set(idsClientes)];

    const clientesFilter = clientes.filter((c) =>
      clientesUnicos.includes(c.id)
    );

    return clientesFilter.flatMap((c) => c.nome);
  }

  static clientesPedidosUnicos() {
    const clientes = ClientesModel.getClientes();
    if (!clientes || clientes.length === 0) {
      return "Não há clientes cadastrados!";
    }

    const pedidos = PedidosModel.getPedidos();
    if (!pedidos || pedidos.length === 0) {
      return "Ainda não há pedidos cadastrados!";
    }

    const pedidosUnicos = pedidos.filter((p) => p.produtos.length === 1);
    if (pedidosUnicos.length === 0) {
      return "Ainda não foi realizado nenhum pedido único!";
    }

    const idsClientes = pedidosUnicos.flatMap((p) => p.cliente);
    const idsClientesUnique = [...new Set(idsClientes)];

    const clientesFilter = clientes.filter((c) =>
      idsClientesUnique.includes(c.id)
    );

    return clientesFilter.map((c) => c.nome);
  }

  static relatorioClientes() {
    const clientes = ClientesModel.getClientes();
    if (!clientes || clientes.length === 0) {
      return "Não há clientes cadastrados!";
    }

    const categorias = CategoriasModel.getCategorias();
    if (!categorias || categorias.length === 0) {
      return "Não há categorias cadastrados!";
    }

    const produtos = ProdutosModel.getProdutos();
    if (!produtos || produtos.length === 0) {
      return "Ainda não há produtos cadastrados!";
    }

    const pedidos = PedidosModel.getPedidos();
    if (!pedidos || pedidos.length === 0) {
      return "Ainda não há pedidos cadastrados!";
    }

    const relatorios = clientes.map((cliente) => {
      const pedidosCliente = pedidos.filter((p) => p.cliente === cliente.id);
      const totalPedidos = pedidosCliente.length;
      const idsProdutos = pedidosCliente.flatMap((p) => p.produtos);
      const idsProdutosUnique = [...new Set(idsProdutos)];

      const produtosCliente = produtos.filter((p) =>
        idsProdutosUnique.includes(p.id)
      );
      const totalProdutos = produtosCliente.length;

      const categoriasCliente = produtosCliente.flatMap((p) => p.categorias);
      const categoriasClienteUnique = [...new Set(categoriasCliente)];
      const totalCategorias = categoriasClienteUnique.length;

      const categoriasCompleta = categorias.filter((c) =>
        categoriasClienteUnique.includes(c.id)
      );
      const nomesCategorias = categoriasCompleta.flatMap((c) => c.nome);

      return {
        nome: cliente ? cliente.nome : "Sem nome cadastrado",
        totalPedidos: pedidosCliente ? totalPedidos : 0,
        totalProdutos: pedidosCliente ? totalProdutos : 0,
        produtos: pedidosCliente ? produtosCliente.map((p) => p.nome) : "",
        totalCategorias: pedidosCliente ? totalCategorias : 0,
        categorias: pedidosCliente ? nomesCategorias : 0,
      };
    });

    return relatorios;
  }
}
