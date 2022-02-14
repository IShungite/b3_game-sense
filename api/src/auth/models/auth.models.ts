export interface IAuthUser {
  _id: string;
  email: string;
}
export interface IAuthPayload {
  email: string;
  sub: string;
}
