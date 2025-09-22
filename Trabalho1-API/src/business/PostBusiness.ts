import { PostData } from "../data/PostData";
import { CustomError } from "../errors/CustomError";
import { Post } from "../types/Post";
import { UsersBusiness } from "./UsersBusiness";
import { UserWithAge } from "../types/User";

function isPost(obj: any): obj is Post {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.createdDate === "string" &&
    typeof obj.published === "boolean" &&
    typeof obj.title === "string" &&
    typeof obj.content === "string" &&
    typeof obj.authorId === "number" &&
    typeof obj.authorName === "string"
  );
}

export class PostBusiness {
  postData!: PostData;
  userBusiness!: UsersBusiness;

  constructor(postData?: PostData, userBusiness?: UsersBusiness) {
    if (postData) this.postData = postData;
    if (userBusiness) this.userBusiness = userBusiness;
  }

  async setPostData(postData: PostData) {
    this.postData = postData;
  }

  async setUserBusiness(userBusiness: UsersBusiness) {
    this.userBusiness = userBusiness;
  }

  async getPostAll(): Promise<Post[]> {
    try {
      const posts: Post[] = await this.postData.getPostAll();

      if (!Array.isArray(posts)) {
        throw new Error("Formato inválido: esperado um array de posts.");
      }

      const invalidPosts = posts.filter((post) => !isPost(post));
      if (invalidPosts.length > 0) {
        console.warn("posts inválidos encontrados:", invalidPosts);
        throw new CustomError("JSON contém posts inválidos!", 400);
      }

      if (!posts) {
        throw new CustomError("Lista de posts está vazia ou não existe!", 404);
      }

      return posts;
    } catch (error: any) {
      throw new CustomError(error.message || "Erro interno no servidor", 500);
    }
  }

  async addPost(
    newPost: Omit<Post, "id" | "createdDate" | "published" | "authorName">
  ): Promise<Post> {
    try {
      const posts: Post[] = await this.getPostAll();
      const users: UserWithAge[] = await this.userBusiness.getUsersAll();

      if (!newPost.authorId) {
        throw new CustomError("O campo ID do autor é obrigatório!", 400);
      }
      if (!users.some((u) => u.id === newPost.authorId)) {
        throw new CustomError("Usuário não encontrado!", 400);
      }
      if (!newPost.title || newPost.title.trim() === "") {
        throw new CustomError("O campo título é obrigatório!", 400);
      }
      if (!newPost.content || newPost.content.trim() === "") {
        throw new CustomError("O campo de conteúdo é obrigatório!", 400);
      }
      const autor = users.find((u) => u.id === newPost.authorId);
      if (!autor) {
        throw new CustomError("Usuário nao encontrado!", 400);
      }
      const nomeDoAutor = autor.name;
      const newPostWithName = { ...newPost, authorName: nomeDoAutor };

      const createdPost = await this.postData.addPost(newPostWithName, posts);
      return createdPost;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async patchPost(
    postUpdates: Partial<
      Omit<Post, "id" | "authorId" | "createdDate" | "authorName">
    >,
    idPost: number,
    idUser: number
  ): Promise<Post> {
    try {
      const posts: Post[] = await this.getPostAll();

      const indexPost = posts.findIndex((p) => p.id === idPost);
      if (indexPost === -1) {
        throw new CustomError("Post não encontrado!", 404);
      }

      const existingPost = posts[indexPost];

      if (existingPost.authorId !== idUser) {
        throw new CustomError("Somente o autor pode alterar esse post!", 403);
      }

      if (postUpdates.title !== undefined && postUpdates.title.trim() === "") {
        throw new CustomError("O campo título não pode ser vazio!", 400);
      }

      if (
        postUpdates.content !== undefined &&
        postUpdates.content.trim() === ""
      ) {
        throw new CustomError("O conteúdo não pode ser vazio!", 400);
      }

      if (
        postUpdates.published !== undefined &&
        typeof postUpdates.published !== "boolean"
      ) {
        throw new CustomError(
          "O campo 'published' deve ser true ou false!",
          400
        );
      }

      const updatedPost = await this.postData.patchPost(
        postUpdates,
        posts,
        idPost,
        idUser
      );

      return updatedPost;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }

  async deletePost(idPost: number, idUser: number): Promise<Post> {
    try {
      const posts: Post[] = await this.getPostAll();
      const users: UserWithAge[] = await this.userBusiness.getUsersAll();

      const indexPost = posts.findIndex((p) => p.id === idPost);
      if (indexPost === -1) {
        throw new CustomError("Post não encontrado!", 404);
      }

      const indexUser = users.findIndex((u) => u.id === idUser);
      if (indexUser === -1) {
        throw new CustomError("Usuário não encontrado!", 404);
      }

      const idUserPost = posts[indexPost].authorId;
      const isAdmin = users[indexUser].role === "admin";

      if (idUserPost !== idUser && !isAdmin) {
        throw new CustomError(
          "Somente o autor ou admin pode deletar esse post!",
          403
        );
      }

      const deletedPost = await this.postData.deletePost(
        idPost,
        idUser,
        users,
        posts
      );

      return deletedPost;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message || "Erro interno no servidor", 500);
      }
    }
  }
}
