export interface User {
  id_user: number;
  name_user: string;
  email_user: string;
  role_user: "admin" | "user";
  nasc_user: string;
}

export interface UserWithAge extends User {
  age_user: number;
}

export interface UserPost {
  name_user: string;
  email_user: string;
  role_user: "admin" | "user";
  nasc_user: string;
  password_user: string;
}

export interface GetPermition {
  role_user: "admin" | "user";
}

export interface CheckUserById {
  id_user: number;
}

export interface UserUpdates {
  name_user: string;
  email_user: string;
  role_user: "admin" | "user";
  nasc_user: string;
  password_user: string;
}
