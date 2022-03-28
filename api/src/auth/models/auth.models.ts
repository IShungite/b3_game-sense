export interface IAuthUser {
  _id: string;
  email: string;
}
export interface IAuthPayload {
  email: string;
  sub: string;
}

export interface IAuthLoginResponse {
  id: string;
  access_token: string;
}
