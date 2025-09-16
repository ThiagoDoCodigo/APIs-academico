import { Request, Response } from "express";
import { ClientesBusiness } from "../business/ClientesBusiness";

export class ClientesController {
  static listarClientes(req: Request, res: Response) {
    const clientes = ClientesBusiness.listaClientes();
    if (!clientes) {
      return res
        .status(404)
        .json({ message: "Ainda não há clientes cadastrados!" });
    }

    return res.status(200).json(clientes);
  }

  static adicionarCliente(req: Request, res: Response) {
    try {
      const nome = req.body?.nome;

      if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ message: "Nome inválido ou ausente" });
      }

      const novoCliente = ClientesBusiness.adicionarCliente(nome.trim());

      return res.status(201).json({
        message: "Cliente cadastrado com sucesso!",
        cliente: novoCliente,
      });
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static clientesCategoria(req: Request, res: Response) {
    try {
      const idCategoria = parseInt(req.params?.id);
      if (!idCategoria) {
        return res
          .status(400)
          .json({ message: "ID da categoria não foi enviado!" });
      }

      const clientes = ClientesBusiness.clientesCategoria(idCategoria);

      if (typeof clientes === "string") {
        return res.status(404).json({ message: clientes });
      }

      if (clientes.length === 0 || clientes === null) {
        return res.status(404).json({ message: "Clientes não encontrados!" });
      }

      return res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro ao procurar clientes:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static clientesPedidosUnicos(req: Request, res: Response) {
    try {
      const clientes = ClientesBusiness.clientesPedidosUnicos();

      if (typeof clientes === "string") {
        return res.status(404).json({ message: clientes });
      }

      return res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro ao procurar clientes:", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static relatoriosClientes(req: Request, res: Response) {
    try {
      const relatorios = ClientesBusiness.relatorioClientes();

      if (typeof relatorios === "string") {
        return res.status(404).json({ message: relatorios });
      }

      return res.status(200).json(relatorios);
    } catch (error) {
      console.error("Erro ao criar relatorios dos clientes :", error);
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
