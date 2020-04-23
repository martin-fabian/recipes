export interface UserEntity {
  id: number;
  name: string;
  password: string;
  email: string;
  created: Date;
  token?: string;
  tokenExpirationDate?: Date;
}
