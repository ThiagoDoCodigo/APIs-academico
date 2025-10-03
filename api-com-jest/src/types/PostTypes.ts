export interface PostWithUser {
  id_post: number;
  id_user: number;
  createddate: Date;
  title_post: string;
  content_post: string;
  published: boolean;
  name_user: string;
}

export interface Post {
  id_post: number;
  id_user: number;
  createddate: Date;
  title_post: string;
  content_post: string;
  published: boolean;
}

export interface CreatePost {
  id_user: number;
  title_post: string;
  content_post: string;
}

export interface CheckUser {
  id_user: number;
}

export interface PostPatch {
  title_post?: string;
  content_post?: string;
  published?: boolean;
}
