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

export interface IAuthUser {
  id: string;
  email: string;
  access_token: string;
}

export enum Role {
  Student = "student",
  Professor = "professor",
  School_Admin = "school_admin",
  Director = "director",
  Super_Admin = "super_admin",
}

export interface JwtToken {
  email: string;
  iat: number;
  exp: number;
  roles: Role[];
}
