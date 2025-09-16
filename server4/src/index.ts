import express, { Application, Response, Request } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

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
    return res.status(404).json({ message: "Ainda não há pedidos!" });
  }
  const nomeCliente = req.query.cliente as string;
  if (!nomeCliente || nomeCliente.trim() === "") {
    return res
      .status(400)
      .json({ message: "O campo nome não foi enviado corretamente!" });
  }

  const pedidosFilter = pedidos.filter(
    (p) => p.name.toLocaleLowerCase() === nomeCliente.toLocaleLowerCase()
  );

  if (pedidosFilter.length === 0) {
    return res
      .status(404)
      .json({ message: "Ainda não há pedidos para esse cliente!" });
  }

  const idsProdutos = pedidosFilter.flatMap((p) => p.produtos);
  const idsUnicos = [...new Set(idsProdutos)];

  const produtosFilter = produtos.filter((p) => idsUnicos.includes(p.id));
  const nomes = produtosFilter.map((p) => p.nome);

  res.status(200).json({ cliente: nomeCliente, produtos: nomes });
});

// Exercício 2: Retornar os clientes que compraram produtos de uma categoria em específico

app.get("/clientes/categorias", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(404).json({ message: "Ainda não há pedidos!" });
  }
  const nomeCat = req.query.categoria as string;
  if (!nomeCat || nomeCat.trim() === "") {
    return res
      .status(400)
      .json({ message: "O campo nome não foi enviado corretamente!" });
  }

  const produtosFilter = produtos.filter((p) => p.categorias.includes(nomeCat));

  if (produtosFilter.length === 0) {
    return res
      .status(404)
      .json({ message: "Ainda não há produtos dessa categoria!" });
  }

  const idsProdutos = produtosFilter.flatMap((p) => p.id);
  const pedidosFilter = pedidos.filter((p) =>
    p.produtos.some((id) => idsProdutos.includes(id))
  );

  if (pedidosFilter.length === 0) {
    return res
      .status(404)
      .json({ message: "Ainda não há pedidos para essa categoria!" });
  }

  const pedidosUnicos = [...new Set(pedidosFilter.map((p) => p.name))];

  res.status(200).json({ clientes: pedidosUnicos });
});

//Exercício 3: Retornar os clientes com apenas um item no pedido

app.get("/pedidosUnicos", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(404).json({ message: "Ainda não há pedidos!" });
  }

  const pedidosFilter = pedidos.filter((p) => p.produtos.length === 1);
  if (pedidosFilter.length === 0) {
    return res.status(404).json({ message: "Ainda não há pedidos únicos!" });
  }

  const pedidosUnicos = [...new Set(pedidosFilter.map((p) => p.name))];

  res.status(200).json({ clientes: pedidosUnicos });
});

//Exercício 4: Retornar um relatório por cliente: total de pedidos, itens distintos e categorias distintas

app.get("/relatoriosClientes", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(404).json({ message: "Ainda não há pedidos!" });
  }

  const clientes = [...new Set(pedidos.map((p) => p.name))];

  const relatorio = clientes.map((cliente) => {
    //Total pedidos:
    const pedidosCliente = pedidos.filter((p) => p.name === cliente);
    const totalPedidos = pedidosCliente.length;

    //itens:
    const idsProdutos = pedidosCliente.flatMap((p) => p.produtos);
    const totalItems = idsProdutos.length;
    const idsUnicos = [...new Set(idsProdutos)];
    const itemsUnique = idsUnicos.length;
    const produtosCliente = produtos.filter((p) => idsUnicos.includes(p.id));
    const nomesProdutos = produtosCliente.map((p) => p.nome);

    //cat:
    const categorias = produtosCliente.flatMap((p) => p.categorias);
    const nomesCat = [...new Set(categorias)];
    const totalCat = nomesCat.length;

    return {
      Cliente: cliente,
      TotalPedidos: totalPedidos,
      totalItems: totalItems,
      itemsUnique: itemsUnique,
      produtos: nomesProdutos,
      totalCat: totalCat,
      categorias: nomesCat,
    };
  });
  return res.status(200).json(relatorio);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
