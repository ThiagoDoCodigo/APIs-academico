import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CustomError } from "../errors/CustomError";
import {
  CreatePost,
  Post,
  PostWithUser,
  PostPatch,
  CheckUser,
} from "../types/PostTypes";
import { GetPermition, CheckUserById } from "../types/UserType";

export class PostService {
  private postRepository = new PostRepository();
  private userRepository = new UserRepository();

  getPostAll = async (): Promise<PostWithUser[]> => {
    try {
      const posts: PostWithUser[] = await this.postRepository.getPostAll();

      if (!posts || posts.length === 0) {
        throw new CustomError("Nenhum post encontrado!", 404);
      }

      return posts as PostWithUser[];
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro ao consultar posts!", 500);
    }
  };

  createPost = async (newPost: CreatePost): Promise<Post> => {
    try {
      const user: CheckUserById[] = await this.userRepository.checkUser(
        newPost.id_user
      );

      if (!user || user.length === 0) {
        throw new CustomError("Uusario não encontrado!", 404);
      }

      if (newPost.title_post.trim().length < 3) {
        throw new CustomError(
          "O campo título deve ter pelo menos 3 caracteres!",
          400
        );
      }

      if (newPost.content_post.trim().length < 10) {
        throw new CustomError(
          "O campo conteúdo deve ter pelo menos 10 caracteres!",
          400
        );
      }

      const createdPost: Post[] = await this.postRepository.createPost(newPost);

      if (!createdPost || createdPost.length === 0) {
        throw new CustomError("Não foi possível cadastrar novo post!", 400);
      }

      return createdPost[0] as Post;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        error.message || "Erro ao cadastrar novo post!",
        500
      );
    }
  };

  patchPost = async (
    id_post: number,
    id_user: number,
    postPatch: PostPatch
  ): Promise<Post> => {
    try {
      const post: CheckUser[] = await this.postRepository.getPostById(id_post);

      if (!post || post.length === 0) {
        throw new CustomError("Post não encontrado!", 404);
      }

      const user: GetPermition[] = await this.userRepository.getPermitionUser(
        id_user
      );

      if (!user || user.length === 0) {
        throw new CustomError("Uusario não encontrado!", 404);
      }

      if (post[0].id_user !== id_user && user[0].role_user !== "admin") {
        throw new CustomError(
          "Você não tem permissão para editar este post!",
          403
        );
      }

      if (
        postPatch.title_post !== undefined &&
        postPatch.title_post.trim().length < 3
      ) {
        throw new CustomError(
          "O campo título deve ter pelo menos 3 caracteres!",
          400
        );
      }

      if (
        postPatch.content_post !== undefined &&
        postPatch.content_post.trim().length < 10
      ) {
        throw new CustomError(
          "O campo conteúdo deve ter pelo menos 10 caracteres!",
          400
        );
      }

      const updatedPost: Post[] = await this.postRepository.patchPost(
        id_post,
        postPatch
      );

      if (!updatedPost || updatedPost.length === 0) {
        throw new CustomError("Post não foi encontrado!", 400);
      }

      return updatedPost[0] as Post;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro ao atualizar post!", 500);
    }
  };

  deletePost = async (id_post: number, id_user: number): Promise<Post> => {
    try {
      const post: CheckUser[] = await this.postRepository.getPostById(id_post);

      if (!post || post.length === 0) {
        throw new CustomError("Post não encontrado!", 404);
      }

      const user: GetPermition[] = await this.userRepository.getPermitionUser(
        id_user
      );

      if (!user || user.length === 0) {
        throw new CustomError("Uusario não encontrado!", 404);
      }

      if (post[0].id_user !== id_user && user[0].role_user !== "admin") {
        throw new CustomError(
          "Vocé não tem permissão para deletar este post!",
          403
        );
      }

      const deletedPost: Post[] = await this.postRepository.deletePost(id_post);

      if (!deletedPost || deletedPost.length === 0) {
        throw new CustomError("Post não foi encontrado!", 400);
      }

      return deletedPost[0] as Post;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message || "Erro ao deletar post!", 500);
    }
  };
}
