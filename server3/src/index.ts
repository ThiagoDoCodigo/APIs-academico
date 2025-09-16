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
  const nomeCliente = req.query.cliente as string;
  if (nomeCliente === "" || !nomeCliente) {
    return res
      .status(400)
      .json({ message: "Nome do cliente não enviado ou inválido!" });
  }
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não há pedidos até o momento!" });
  }

  const pedidosFilter = pedidos.filter(
    (p) => p.name.toLocaleLowerCase() === nomeCliente.toLocaleLowerCase()
  );

  if (pedidosFilter.length === 0) {
    return res.status(400).json({
      message: "Cliente não encontrado ou não realizou nenhum pedido!",
    });
  }

  const idsProdutos = pedidosFilter.flatMap((p) => p?.produtos ?? []);
  const idsUnicos = [...new Set(idsProdutos)];
  const produtosFilter = produtos.filter((p) => idsUnicos.includes(p.id));
  const nomes = [...new Set(produtosFilter.map((p) => p.nome))];
  return res.status(200).json({ cliente: nomeCliente, produtos: nomes });
});

// Exercício 2: Retornar os clientes que compraram produtos de uma categoria em específico

app.get("/clientes/categorias", (req: Request, res: Response) => {
  const nomeCat = req.query.categoria as string;
  if (nomeCat === "" || !nomeCat) {
    return res
      .status(400)
      .json({ message: "Nome da categoria não enviado ou inválido!" });
  }
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não há pedidos até o momento!" });
  }

  const produtosFilter = produtos.filter((p) => p.categorias.includes(nomeCat));

  if (produtosFilter.length === 0) {
    return res
      .status(400)
      .json({ message: "Não há produtos desta categoria!" });
  }

  const idsProdutos = produtosFilter.flatMap((p) => p.id);
  const pedidosFilter = pedidos.filter((p) =>
    p.produtos.some((id) => idsProdutos.includes(id))
  );

  if (pedidosFilter.length === 0) {
    return res
      .status(400)
      .json({ message: "Não há pedidos nesta categoria até o momento!" });
  }

  const pedidosUnicosNomes = [...new Set(pedidosFilter.map((p) => p.name))];

  return res.status(200).json(pedidosUnicosNomes);
});

//Exercício 3: Retornar os clientes com apenas um item no pedido

app.get("/pedidosUnicos", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não há pedidos até o momento!" });
  }

  const pedidosUnicos = pedidos.filter((p) => p.produtos.length === 1);

  if (pedidosUnicos.length === 0) {
    return res
      .status(400)
      .json({ message: "Não há pedidos unicos até o momento!" });
  }

  const nomes = [...new Set(pedidosUnicos.map((p) => p.name))];
  return res.status(200).json(nomes);
});

//Exercício 4: Retornar um relatório por cliente: total de pedidos, itens distintos e categorias distintas

app.get("/relatoriosClientes", (req: Request, res: Response) => {
  if (pedidos.length === 0) {
    return res.status(400).json({ message: "Não há pedidos até o momento!" });
  }

  const clientesUnicos = [...new Set(pedidos.map((p) => p.name))];

  const relatorioClientes = clientesUnicos.map((cliente) => {
    //total de pedidos:
    const pedidosCliente = pedidos.filter((p) => p.name === cliente);
    const totalPedidos = pedidosCliente.length;

    //itens distintos:
    const idsProdutos = pedidosCliente.flatMap((p) => p.produtos);
    const idsUnicos = [...new Set(idsProdutos)];
    const totalItems = idsProdutos.length;
    const totalItemsDistintos = idsUnicos.length;
    const produtosCliente = produtos.filter((p) => idsUnicos.includes(p.id));
    const nomeProdutos = produtosCliente.flatMap((p) => p.nome);

    //Categorias distintas:
    const categorias = produtosCliente.flatMap((p) => p.categorias);
    const categoriasUnicas = [...new Set(categorias)];
    const totalCategorias = categoriasUnicas.length;

    return {
      Cliente: cliente,
      TotalPedidos: totalPedidos,
      TotalItens: totalItems,
      ItensDistintos: totalItemsDistintos,
      Produtos: nomeProdutos,
      TotalCategorias: totalCategorias,
      Categorias: categoriasUnicas,
    };
  });

  return res.status(200).json(relatorioClientes);
});

//Exercício 5: Retornar produtos que contenham um trecho de uma busca em suas categorias (com query params)
app.get("/produtos/categoria", (req: Request, res: Response) => {
  if (produtos.length === 0) {
    return res
      .status(400)
      .json({ message: "Não há atualmente nenhum produto cadastrado!" });
  }
  const nomeCat = req.query.categoria as string;
  if (nomeCat === "" || !nomeCat) {
    return res
      .status(400)
      .json({ message: "Nome da categoria não enviado ou inválido!" });
  }

  const produtosFiltrados = produtos.filter((p) =>
    p.categorias.some((c) => c.includes(nomeCat))
  );

  if (produtosFiltrados.length === 0) {
    return res.status(400).json({
      message: "Não há atualmente nenhum produto cadastrado nesta categoria!",
    });
  }

  res.status(200).json({ Produtos: produtosFiltrados.map((p) => p.nome) });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
