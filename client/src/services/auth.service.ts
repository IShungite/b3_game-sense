import { LoginData, RegisterData } from "models/auth";
import api from "../api";

const register = async (formData: RegisterData) => api.register(formData);

const login = async (formData: LoginData) => {
  const user = (await api.login(formData)).data;

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
