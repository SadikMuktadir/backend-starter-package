export interface IRegisterUser {
  email: string;
  password: string;
  role?: 'ADMIN' | 'MODERATOR' | 'USER';
}

export interface ILoginUser {
  email: string;
  password: string;
}
