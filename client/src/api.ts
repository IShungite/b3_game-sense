import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { IUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";

const API = axios.create({ baseURL: `${API_URL}:${API_PORT}` });

API.interceptors.request.use((req: AxiosRequestConfig) => {
  const storageUser = localStorage.getItem("user");

  if (storageUser) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: IUser = JSON.parse(storageUser);
    if (user && user.access_token && req.headers) {
      req.headers.Authorization = `Bearer ${user.access_token}`;
    }
  }
  return req;
});

const login = (formData: LoginCredentialsDto): Promise<AxiosResponse<IUser>> => API.post("/auth/login", formData);
const register = (formData: RegisterCredentialsDto): Promise<AxiosResponse<IUser>> =>
  API.post("/auth/register", formData);

export default { login, register };
