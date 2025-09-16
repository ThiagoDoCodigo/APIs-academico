import { ProdutosModel } from "../models/ProdutosModel";
import { CategoriasModel } from "../models/CategoriasModel";
import { PedidosModel } from "../models/PedidosModel";

export class ProdutosBusiness {
  static produtosCliente(id: number) {
    const pedidosCliente = PedidosModel.getPedidos();
    if (!pedidosCliente || pedidosCliente.length === 0) {
      return "Ainda não há pedidos cadastrados!";
    }
    const pedidosClienteFilter = pedidosCliente.filter((p) => p.cliente === id);

    if (pedidosClienteFilter.length === 0) {
      return "Ainda não há pedidos cadastrados para esse cliente!";
    }

    const idsProdutos = pedidosClienteFilter.flatMap((p) => p.produtos);
    const produtoUnicos = [...new Set(idsProdutos)];

    const produtos = ProdutosModel.getProdutos();
    const produtosFilter = produtos.filter((p) => produtoUnicos.includes(p.id));

    return produtosFilter;
  }

  static produtosIncludesCategoria(nome: string) {
    const categorias = CategoriasModel.getCategorias();
    if (!categorias || categorias.length === 0) {
      return "Ainda não foi cadastrada nenhuma categoria!";
    }

    const produtos = ProdutosModel.getProdutos();
    if (!produtos || produtos.length === 0) {
      return "Ainda não foi cadastrado nenhum produto!";
    }

    const categoriasFilter = categorias.filter((c) =>
      c.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase())
    );

    if (categoriasFilter.length === 0) {
      return "Ainda não foi cadastrada nenhuma categoria com o trecho enviado!";
    }

    const idsCategorias = categoriasFilter.flatMap((c) => c.id);

    const produtosFilter = produtos.filter((p) =>
      p.categorias.some((id) => idsCategorias.includes(id))
    );

    if (produtosFilter.length === 0) {
      return "Ainda não foi cadastrado nenhum produto com a(s) categoria(s) desejada(s!";
    }

    return produtosFilter.map((p) => p.nome);
  }
}
