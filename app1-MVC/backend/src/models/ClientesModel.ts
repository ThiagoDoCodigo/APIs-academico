import { clientes } from "../data/data";

export class ClientesModel {
  static getClientes() {
    return clientes;
  }

  static addCliente(nome: string) {
    const novoId =
      clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;

    const novoCliente = { id: novoId, nome: nome };
    clientes.push(novoCliente);
    return novoCliente;
  }

  static updateCliente(id: number, nome: string) {
    const cliente = clientes.find((c) => c.id === id);
    if (!cliente) {
      return null;
    }
    cliente.nome = nome;
    return cliente;
  }

  static removeCliente(id: number) {
    const index = clientes.findIndex((c) => c.id === id);
    if (index === -1) {
      return false;
    }
    clientes.slice(index, 1);
    return true;
  }
}
