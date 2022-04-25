import { Role } from "models/auth/auth";

export interface IUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: Role[];
}
