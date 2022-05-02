import Role from "./roles.enum";

export interface JwtPayload {
  _id: string;
  email: string;
}
export interface IAuthPayload {
  email: string;
  roles: Role[];
  sub: string;
}

export interface IAuthLoginResponse {
  id: string;
  access_token: string;
}

export interface IUserRequest {
  id: string;
  email: string;
  roles: Role[];
}
