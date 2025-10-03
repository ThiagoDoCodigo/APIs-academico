import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { CreatePost, Post, PostPatch, PostWithUser } from "../types/PostTypes";
import { PostService } from "../services/PostService";

export class PostController {
  private postService = new PostService();

  getPostAll = async (req: Request, res: Response) => {
    try {
      const posts: PostWithUser[] = await this.postService.getPostAll();
      return res.status(200).json({
        posts: posts,
        message: "Posts consultados com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  createPost = async (req: Request, res: Response) => {
    try {
      const newPost = req.body.post as CreatePost;

      if (!Number.isInteger(newPost.id_user) || newPost.id_user < 1) {
        return res.status(400).json({
          message: "O campo ID do usuário é inválido!",
          success: false,
        });
      }

      if (!newPost.title_post) {
        return res.status(400).json({
          message: "O campo de título do post não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newPost.title_post !== "string" ||
        newPost.title_post.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de título do post está inválido!",
          success: false,
        });
      }

      if (!newPost.content_post) {
        return res.status(400).json({
          message: "O campo de conteúdo do post não foi enviado!",
          success: false,
        });
      }

      if (
        typeof newPost.content_post !== "string" ||
        newPost.content_post.trim() === ""
      ) {
        return res.status(400).json({
          message: "O campo de conteúdo do post está inválido!",
          success: false,
        });
      }

      const createdPost: Post = await this.postService.createPost(newPost);
      return res.status(201).json({
        message: "Post criado com sucesso!",
        success: true,
        post: createdPost,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  patchPost = async (req: Request, res: Response) => {
    try {
      const id_post = Number(req.params.idPost);
      const id_user = Number(req.params.idUser);
      const postPatch = req.body.post as PostPatch;

      if (!Number.isInteger(id_post) || id_post < 1) {
        return res.status(400).json({
          message: "O campo ID do post é inválido!",
          success: false,
        });
      }

      if (!Number.isInteger(id_user) || id_user < 1) {
        return res.status(400).json({
          message: "O campo ID do usuário é inválido!",
          success: false,
        });
      }

      if (
        postPatch.title_post !== undefined &&
        (typeof postPatch.title_post !== "string" ||
          postPatch.title_post.trim() === "")
      ) {
        return res.status(400).json({
          message: "O campo de título do post está inválido!",
          success: false,
        });
      }

      if (
        postPatch.content_post !== undefined &&
        (typeof postPatch.content_post !== "string" ||
          postPatch.content_post.trim() === "")
      ) {
        return res.status(400).json({
          message: "O campo de conteúdo do post está inválido!",
          success: false,
        });
      }

      if (
        postPatch.published !== undefined &&
        typeof postPatch.published !== "boolean"
      ) {
        return res.status(400).json({
          message: "O campo de publicação do post está inválido!",
          success: false,
        });
      }

      if (
        postPatch.title_post === undefined &&
        postPatch.content_post === undefined &&
        postPatch.published === undefined
      ) {
        return res.status(400).json({
          message: "Nenhum campo para atualizar foi enviado!",
          success: false,
        });
      }

      const updatedPost: Post = await this.postService.patchPost(
        id_post,
        id_user,
        postPatch
      );
      return res.status(200).json({
        message: "Post atualizado com sucesso!",
        success: true,
        post: postPatch,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };

  deletePost = async (req: Request, res: Response) => {
    try {
      const id_post = Number(req.params.idPost);
      const id_user = Number(req.params.idUser);

      if (!Number.isInteger(id_post) || id_post < 1) {
        return res.status(400).json({
          message: "O campo ID do post é inválido!",
          success: false,
        });
      }

      if (!Number.isInteger(id_user) || id_user < 1) {
        return res.status(400).json({
          message: "O campo ID do usuário é inválido!",
          success: false,
        });
      }

      const deletedPost: Post = await this.postService.deletePost(
        id_post,
        id_user
      );
      return res.status(200).json({
        post: deletedPost,
        message: "Post deletado com sucesso!",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, success: false });
      } else {
        return res
          .status(500)
          .json({ message: "Erro inesperado!", success: false });
      }
    }
  };
}
