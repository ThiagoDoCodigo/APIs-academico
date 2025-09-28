import sequelize from "../data/database";
import { QueryTypes } from "sequelize";
import {
  PostWithUser,
  CreatePost,
  Post,
  PostPatch,
  CheckUser,
} from "../types/PostTypes";

export class PostRepository {
  getPostAll = async (): Promise<PostWithUser[]> => {
    const querySql = `
      SELECT id_post, p.id_user, TO_CHAR(createdDate, 'DD/MM/YYYY') as createddate,
        title_post, content_post, published, u.name_user
      FROM posts p
      JOIN users u ON u.id_user = p.id_user
      ORDER BY id_post;
    `;

    try {
      const result = await sequelize.query<PostWithUser>(querySql, {
        type: QueryTypes.SELECT,
      });

      return result as PostWithUser[];
    } catch (error: any) {
      throw error;
    }
  };

  createPost = async (newPost: CreatePost): Promise<Post[]> => {
    const querySql = `
      INSERT INTO posts (id_user, createddate, title_post, content_post)
      VALUES (:id_user, NOW(), :title_post, :content_post)
      RETURNING id_post, id_user, TO_CHAR(createdDate, 'DD/MM/YYYY') as createddate,
        title_post, content_post, published
    `;

    try {
      const result = await sequelize.query<Post>(querySql, {
        replacements: {
          id_user: newPost.id_user,
          title_post: newPost.title_post.trim(),
          content_post: newPost.content_post.trim(),
        },
        type: QueryTypes.SELECT,
      });

      return result as Post[];
    } catch (error: any) {
      throw error;
    }
  };

  getPostById = async (id_post: number): Promise<CheckUser[]> => {
    const querySql = `
    SELECT id_user
    FROM posts
    WHERE id_post = :id_post;
  `;

    const result = await sequelize.query<CheckUser>(querySql, {
      replacements: { id_post },
      type: QueryTypes.SELECT,
    });

    return result as CheckUser[];
  };

  patchPost = async (
    id_post: number,
    postUpdates: PostPatch
  ): Promise<Post[]> => {
    const fields: string[] = [];
    const replacements: any = { id_post };

    if (postUpdates.title_post !== undefined) {
      fields.push("title_post = :title_post");
      replacements.title_post = postUpdates.title_post.trim();
    }

    if (postUpdates.content_post !== undefined) {
      fields.push("content_post = :content_post");
      replacements.content_post = postUpdates.content_post.trim();
    }

    if (postUpdates.published !== undefined) {
      fields.push("published = :published");
      replacements.published = postUpdates.published;
    }

    const querySql = `
    UPDATE posts
    SET ${fields.join(", ")}
    WHERE id_post = :id_post
    RETURNING id_post, id_user, TO_CHAR(createdDate, 'DD/MM/YYYY') as createddate,
      title_post, content_post, published
  `;

    try {
      const result = await sequelize.query<Post>(querySql, {
        replacements,
        type: QueryTypes.SELECT,
      });

      return result as Post[];
    } catch (error: any) {
      throw error;
    }
  };

  deletePost = async (id_post: number): Promise<Post[]> => {
    const querySql = `
    DELETE FROM posts
    WHERE id_post = :id_post
    RETURNING id_post, id_user, TO_CHAR(createdDate, 'DD/MM/YYYY') as createddate,
      title_post, content_post, published
  `;

    try {
      const result = await sequelize.query<Post>(querySql, {
        replacements: { id_post },
        type: QueryTypes.SELECT,
      });

      return result as Post[];
    } catch (error: any) {
      throw error;
    }
  };
}
