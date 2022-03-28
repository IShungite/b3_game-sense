export interface LoginCredentialsDto {
  email: string;
  password: string;
}

export interface RegisterCredentialsDto {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface IUser {
  id: string;
  access_token: string;
}

export interface JwtToken {
  email: string;
  iat: number;
  exp: number;
}
