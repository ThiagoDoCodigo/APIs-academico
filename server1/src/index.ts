import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

interface Produto {
  id: number;
  nome: string;
  tipo: number;
  price: number;
  estoque: number;
}

interface Tipo {
  id: number;
  nome: string;
}

let produtos: Produto[] = [
  { id: 1, nome: "Tv samsung 50 4k", tipo: 1, price: 2799.99, estoque: 45 },
  { id: 2, nome: "RTX 5070", tipo: 2, price: 4299.99, estoque: 21 },
  { id: 3, nome: "Tv LG 42 4k", tipo: 1, price: 1899.99, estoque: 40 },
  { id: 4, nome: "AMD RYZEN 5 5600", tipo: 5, price: 899.99, estoque: 30 },
];

let tipos: Tipo[] = [
  { id: 1, nome: "Eletronicos" },
  { id: 2, nome: "Informatica" },
];

app.get("/listaProdutos", (req: Request, res: Response) => {
  if (produtos.length === 0 || !produtos) {
    return res
      .status(404)
      .json({ message: "Lista de produtos esta vázia ou não existe!" });
  }

  const produtosComTipo = produtos.map((produto) => {
    const tipo = tipos.find((t) => produto.tipo === t.id);

    return {
      ...produto,
      nomeProduto: tipo ? tipo.nome : "Tipo nao encontrado!",
    };
  });

  res.status(200).json({
    message: "Lista acessada com sucesso!",
    produtos: produtosComTipo,
  });
});

app.get("/listaProdutos/:id", (req: Request, res: Response) => {
  const idProduto = parseInt(req.params.id);
  if (produtos.length === 0 || !produtos) {
    return res
      .status(404)
      .json({ message: "Lista de produtos esta vázia ou não existe!" });
  }

  interface ProdutoComTipo extends Produto {
    nomeTipo: string;
  }

  const produtoFiltrado = produtos.find((p) => p.id === idProduto);

  if (!produtoFiltrado) {
    return res.status(404).json({ message: "Produto não encontrado!" });
  }

  const tipo = tipos.find((t) => t.id === produtoFiltrado.tipo);
  const produtoComTipo: ProdutoComTipo = {
    ...produtoFiltrado,
    nomeTipo: tipo ? tipo.nome : "Tipo não encontrado",
  };

  return res.status(200).json({
    produto: produtoComTipo,
    message: "Produto encontrado com sucesso!",
  });
});

app.post("/cadastrarProduto", (req: Request, res: Response) => {
  const produto = req.body.produto;
  const { nome, tipo, price } = produto;

  if (typeof nome != "string" || !nome || nome.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nome inválido ou não enviado na requisição!" });
  }

  if (typeof tipo !== "number" || isNaN(tipo)) {
    return res
      .status(400)
      .json({ message: "Tipo inválido ou não enviado na requisição!" });
  }

  if (typeof price !== "number" || isNaN(price)) {
    return res
      .status(400)
      .json({ message: "Preço inválido ou não enviado na requisição!" });
  }

  const novoProduto: Produto = {
    id: produtos.length + 1,
    nome: nome,
    tipo: tipo,
    price: price,
    estoque: 0,
  };
  produtos = [...produtos, novoProduto];
  return res.status(201).json({
    produto: produtos,
    message: "Produto cadastrado com sucesso!",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
