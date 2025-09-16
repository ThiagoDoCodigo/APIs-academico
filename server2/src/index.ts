import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pedidos = [
  // id, name = cliente, produtos = ids dos produtos
  { id: 1, name: "Leonardo", produtos: [1, 2] },
  { id: 2, name: "Philippe", produtos: [3] },
  { id: 3, name: "Pablo", produtos: [2, 3] },
  { id: 4, name: "Ana", produtos: [4] },
  { id: 5, name: "Pablo", produtos: [5, 2, 1] },
  { id: 6, name: "Leonardo", produtos: [3] },
  { id: 7, name: "Marina", produtos: [2] },
  { id: 8, name: "Ana", produtos: [2, 4] },
  { id: 9, name: "Carlos", produtos: [6] },
];

const produtos = [
  // id, nome, categorias (strings)
  { id: 1, nome: "Chocolate Ate", categorias: ["Doces", "Guloseimas"] },
  { id: 2, nome: "Chiclete Doido", categorias: ["Guloseimas", "Apimentados"] },
  { id: 3, nome: "Bala Encontrada", categorias: ["Guloseimas", "Refrescante"] },
  { id: 4, nome: "Amendoim Crocante", categorias: ["Salgados"] },
  { id: 5, nome: "Pimenta Turbo", categorias: ["Apimentados"] },
  { id: 6, nome: "Água com Gás", categorias: ["Bebidas", "Refrescante"] },
];

// Hello, Express!
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Exercício 1: Retornar os produtos comprados por um cliente em específico

app.get("/produtos/cliente", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não existem pedidos ainda!" });
  }
  const nomeCliente = req.query.cliente as string;

  if (!nomeCliente || nomeCliente.trim() === "") {
    return res.status(400).json({ message: "O campo cliente é obrigatório!" });
  }

  const pedidosCliente = pedidos.filter(
    (p) => p.name.toLocaleLowerCase() === nomeCliente.toLocaleLowerCase()
  );

  if (pedidosCliente.length === 0) {
    return res.status(400).json({ message: "Cliente não encontrado!" });
  }

  const idsProdutosComprados = pedidosCliente.flatMap(
    (pc) => pc?.produtos ?? []
  );

  const idsUnicos = [...new Set(idsProdutosComprados)];

  const produtosComprados = produtos.filter((produto) =>
    idsUnicos.includes(produto.id)
  );

  return res.status(200).json({
    cliente: nomeCliente,
    produtos: produtosComprados.map((pc) => pc.nome),
  });
});

// Exercício 2: Retornar os clientes que compraram produtos de uma categoria em específico

app.get("/clientes/cat", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não existem pedidos ainda!" });
  }

  const nomeCat = req.query.cat as string;

  if (!nomeCat || nomeCat.trim() === "") {
    return res
      .status(400)
      .json({ message: "O campo categoria é obrigatório!" });
  }

  const produtosCat = produtos.filter((p) => p.categorias.includes(nomeCat));
  const idsProdutos = produtosCat.flatMap((p) => p.id);

  const clientes = pedidos.filter((p) =>
    p.produtos.some((produto) => idsProdutos.includes(produto))
  );

  const clientesUnicos = [...new Set(clientes.map((c) => c.name))];

  if (clientesUnicos.length === 0) {
    return res
      .status(400)
      .json({ message: "Clientes não encontrados na categoria!" });
  }

  return res.status(200).json(clientesUnicos);
});

//Exercício 3: Retornar os clientes com apenas um item no pedido

//Exercício 4: Retornar um relatório por cliente: total de pedidos, itens distintos e categorias distintas

app.get("/relatorios", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não existem pedidos ainda!" });
  }

  const clientes = [...new Set(pedidos.map((p) => p.name))];

  const relatorioCliente = clientes.map((cliente) => {
    //total de pedidos:
    const pedidosCliente = pedidos.filter((p) => p.name === cliente);
    const totalPedidos = pedidosCliente.length;

    //produtos distintos:
    const produtosCliente = pedidosCliente.flatMap((p) => p.produtos);
    const produtosDistintos = [...new Set(produtosCliente)];
    const totalProdutos = produtosDistintos.length;

    //categorias distintas:
    const produtosComprados = produtos.filter((p) =>
      produtosDistintos.includes(p.id)
    );
    const listaCat = produtosComprados.flatMap((p) => p.categorias);
    const listaCatUnica = [...new Set(listaCat)];
    const totalCategorias = listaCatUnica.length;

    return {
      cliente: cliente,
      totalPedidos: totalPedidos,
      items: produtosComprados.map((p) => p.nome),
      totalProdutos: totalProdutos,
      categorias: listaCatUnica,
      totalCategorias: totalCategorias,
    };
  });

  return res.status(200).json(relatorioCliente);
});

//Exercício 5: Retornar produtos que contenham um trecho de uma busca em suas categorias (com query params)

app.listen(3000, () => console.log("API on http://localhost:3000"));
