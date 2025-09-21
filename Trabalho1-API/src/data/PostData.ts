import { Post } from "../types/Post";
import { UserWithAge } from "../types/User";
import { promises as fs } from "fs";
import path from "path";
import { CustomError } from "../errors/CustomError";
const dataLocal: string = "../dbPost.json";
const filePath = path.join(__dirname, dataLocal);

export class PostData {
  async getPostAll(): Promise<Post[]> {
    const dataPosts = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(dataPosts);

    return posts;
  }

  async addPost(
    newPost: Omit<Post, "id" | "createdDate" | "published">,
    posts: Post[]
  ): Promise<Post> {
    const newId =
      posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

    const postAdd: Post = {
      id: newId,
      createdDate: new Date().toISOString(),
      published: false,
      ...newPost,
    };

    posts.push(postAdd);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");

    return postAdd;
  }

  async patchPost(
    postUpdates: Partial<Omit<Post, "id" | "authorId" | "createdDate">>,
    posts: Post[],
    idPost: number,
    idUser: number
  ): Promise<Post> {
    const indexPost = posts.findIndex((p) => p.id === idPost);
    if (indexPost === -1) {
      throw new CustomError("Post não encontrado!", 404);
    }

    const idUserPost = posts[indexPost].authorId;

    if (idUserPost !== idUser) {
      throw new CustomError("Somente o autor pode alterar esse post!", 403);
    }

    const updatedPost = {
      ...posts[indexPost],
      ...postUpdates,
    };

    posts[indexPost] = updatedPost;
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");

    return updatedPost;
  }

  async deletePost(
    idPost: number,
    idUser: number,
    users: UserWithAge[],
    posts: Post[]
  ): Promise<Post> {
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

    const deletedPost = posts[indexPost];
    posts.splice(indexPost, 1);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");

    return deletedPost;
  }
}
