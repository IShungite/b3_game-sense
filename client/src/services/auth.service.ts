import { LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
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

export default {
  register,
  login,
  logout,
};
