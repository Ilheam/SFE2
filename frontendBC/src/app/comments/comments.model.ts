export interface Comment {
  id: number;
  text: string;
  created: Date;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  email: string;
}
