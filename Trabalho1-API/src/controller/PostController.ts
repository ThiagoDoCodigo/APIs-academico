import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { Post } from "../types/Post";
import { postBusiness } from "../serviceContainer/instances";

export class PostController {
  async getPostAll(req: Request, res: Response) {
    try {
      const posts = await postBusiness.getPostAll();
      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async addPost(req: Request, res: Response) {
    try {
      const post = req.body.post as Omit<
        Post,
        "id" | "createdDate" | "published"
      >;

      if (!post.authorId || isNaN(Number(post.authorId))) {
        return res
          .status(400)
          .json({ message: "O campo ID do autor é obrigatório!" });
      }
      if (
        !post.title ||
        typeof post.title !== "string" ||
        post.title.trim() === ""
      ) {
        return res
          .status(400)
          .json({ message: "O campo título é obrigatório!" });
      }

      if (post.title.trim().length < 3) {
        return res.status(400).json({
          message: "O campo título deve ter pelo menos 3 caracteres!",
        });
      }
      if (
        !post.content ||
        typeof post.content !== "string" ||
        post.content.trim() === ""
      ) {
        return res
          .status(400)
          .json({ message: "O campo de conteúdo é obrigatório!" });
      }
      if (post.content.trim().length < 10) {
        return res.status(400).json({
          message: "O campo de conteúdo deve ter pelo menos 10 caracteres!",
        });
      }

      const newPost = await postBusiness.addPost(post);
      return res
        .status(201)
        .json({ message: "Post cadastrado com sucesso!", post: newPost });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async patchPost(req: Request, res: Response) {
    try {
      const post = req.body.post as Partial<
        Omit<Post, "id" | "authorId" | "createdDate">
      >;

      const idPost = parseInt(req.params.idPost);
      const idUser = parseInt(req.params.idUser);

      if (isNaN(idPost) || idPost <= 0) {
        return res.status(400).json({
          message: "O campo ID do post é obrigatório!",
        });
      }

      if (isNaN(idUser) || idUser <= 0) {
        return res.status(400).json({
          message: "O campo ID do usuário é obrigatório!",
        });
      }

      if (
        post.title === undefined &&
        post.content === undefined &&
        post.published === undefined
      ) {
        return res.status(400).json({
          message: "Nenhum campo foi informado para atualização!",
        });
      }

      if (post.title !== undefined && post.title.trim() === "") {
        return res
          .status(400)
          .json({ message: "O campo título não pode ser vazio!" });
      }

      if (post.title !== undefined && post.title.trim().length < 3) {
        return res.status(400).json({
          message: "O campo título deve ter pelo menos 3 caracteres!",
        });
      }

      if (post.content !== undefined && post.content.trim() === "") {
        return res
          .status(400)
          .json({ message: "O conteúdo não pode ser vazio!" });
      }

      if (post.content !== undefined && post.content.trim().length < 10) {
        return res.status(400).json({
          message: "O campo de conteúdo deve ter pelo menos 10 caracteres!",
        });
      }

      if (post.published !== undefined && typeof post.published !== "boolean") {
        return res
          .status(400)
          .json({ message: "O campo 'published' deve ser true ou false!" });
      }

      const newPost = await postBusiness.patchPost(post, idPost, idUser);
      return res
        .status(201)
        .json({ message: "Post atualizado com sucesso!", post: newPost });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const idPost = parseInt(req.params.idPost);
      const idUser = parseInt(req.params.idUser);

      if (isNaN(idPost) || idPost <= 0) {
        return res
          .status(400)
          .json({ message: "O campo ID do post é obrigatório!" });
      }

      if (isNaN(idUser) || idUser <= 0) {
        return res
          .status(400)
          .json({ message: "O campo ID do usuário é obrigatório!" });
      }

      await postBusiness.deletePost(idPost, idUser);
      return res.status(201).json({ message: "Post deletado com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado!" });
      }
    }
  }
}
