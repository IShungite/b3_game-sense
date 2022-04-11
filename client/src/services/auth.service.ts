import { IUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { hash } from "utils";
import api from "../api";

const register = async (formData: RegisterCredentialsDto) => {
  await api.register({ ...formData, password: hash(formData.password) });
};

const login = async (formData: LoginCredentialsDto) => {
  const user = (await api.login({ ...formData, password: hash(formData.password) })).data;

  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

const logout = () => {
  localStorage.removeItem("user");
  return undefined;
};

export const getUserFromLocalStorage = () => {
  const storageUser = localStorage.getItem("user");

  if (storageUser) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: IUser = JSON.parse(storageUser);
    if (user) return user;
  }

  return undefined;
};

export default {
  register,
  login,
  logout,
};
