export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  nasc: string;
  password: string;
}

export interface UserWithAge extends User {
  age: number;
}
