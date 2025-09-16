import express, { Application, Request, Response } from "express";
import corsr from "cors";
import "dotenv/config";
import ClientesRouter from "./routes/ClientesRouter";
import ProdutosRouter from "./routes/ProdutosRouter";
import PedidosRouter from "./routes/PedidosRouter";

const app: Application = express();
app.use(corsr());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api", ClientesRouter);

app.use("/api", ProdutosRouter);

app.use("/api", PedidosRouter);

// MVC
// index.ts -> inicia o servidor e o app
// PedidosRoutes.ts -> Aqui entram apenas o roteamento
// PedidosController.ts -> Pega dados da req e envia para a o método correspondente da camada de business
// PedidosBusiness.ts -> Validação, verificação, regras de negócio e chamada dos métodos da camada de model
// PedidosModel.ts -> queries (no caso serão acessos direto aos vetores do bd, funções de vetores)
// bd.ts -> Vetores (lembrando de exportar)

// Exercício 1: Retornar os produtos comprados por um cliente em específico V

// Exercício 2: Retornar os clientes que compraram produtos de uma categoria em específico V

//Exercício 3: Retornar os clientes com apenas um item no pedido V

//Exercício 4: Retornar um relatório por cliente: total de pedidos, itens distintos e categorias distintas V

//Exercício 5: Retornar produtos que contenham um trecho de uma busca em suas categorias (com query params) V

//Exercicio 6: Remover todos pedidos de um determinado cliente de uma determinada categoria
//Exemplo, remover todos doces de Leonardo
// '/pedidos/:idCliente/categoria/:idCategoria'

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
