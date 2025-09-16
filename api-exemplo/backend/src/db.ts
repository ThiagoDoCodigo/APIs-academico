interface Cliente {
  id: number;
  nome: string;
}

interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  categorias: number[];
}

interface Pedido {
  id: number;
  cliente: number;
  produtos: number[];
}

export const clientes: Cliente[] = [
  { id: 1, nome: "Leonardo" },
  { id: 2, nome: "Phillipe" },
  { id: 3, nome: "Pablo" },
  { id: 4, nome: "Ana" },
  { id: 5, nome: "Marina" },
  { id: 6, nome: "Carlos" },
];

export const pedidos: Pedido[] = [
  // id, name = cliente, produtos = ids dos produtos
  { id: 1, cliente: 1, produtos: [1, 2] },
  { id: 2, cliente: 2, produtos: [3] },
  { id: 3, cliente: 3, produtos: [2, 3] },
  { id: 4, cliente: 4, produtos: [4] },
  { id: 5, cliente: 3, produtos: [5, 2, 1] },
  { id: 6, cliente: 1, produtos: [3] },
  { id: 7, cliente: 5, produtos: [2] },
  { id: 8, cliente: 4, produtos: [2, 4] },
  { id: 9, cliente: 6, produtos: [6] },
];

export const produtos: Produto[] = [
  // id, nome, categorias (strings)
  { id: 1, nome: "Chocolate Ate", categorias: [1, 2] },
  { id: 2, nome: "Chiclete Doido", categorias: [2, 3] },
  { id: 3, nome: "Bala Encontrada", categorias: [2, 4] },
  { id: 4, nome: "Amendoim Crocante", categorias: [5] },
  { id: 5, nome: "Pimenta Turbo", categorias: [3] },
  { id: 6, nome: "Água com Gás", categorias: [6, 4] },
];

export const categorias: Categoria[] = [
  { id: 1, nome: "Doces" },
  { id: 2, nome: "Guloseimas" },
  { id: 3, nome: "Apimentados" },
  { id: 4, nome: "Refrescantes" },
  { id: 5, nome: "Salgados" },
  { id: 6, nome: "Bebidas" },
];
