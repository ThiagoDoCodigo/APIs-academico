export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  nasc: string;
  password: string;
}

export interface UserWithAge extends User {
  age: number;
}
