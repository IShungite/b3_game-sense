import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { IUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { ICategory } from "models/category/category";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import { IProduct } from "models/products/products";
import { IShop } from "models/shops/shop";
import { getUserFromLocalStorage } from "services/auth.service";

const API = axios.create({ baseURL: `${API_URL}:${API_PORT}` });

API.interceptors.request.use((req: AxiosRequestConfig) => {
  const user = getUserFromLocalStorage();

  if (user && req.headers) {
    req.headers.Authorization = `Bearer ${user.access_token}`;
  }

  return req;
});

const login = (formData: LoginCredentialsDto): Promise<AxiosResponse<IUser>> => API.post("/auth/login", formData);
const register = (formData: RegisterCredentialsDto): Promise<AxiosResponse<IUser>> =>
  API.post("/auth/register", formData);

const createCharacter = (formData: CreateCharacterDto): Promise<AxiosResponse<ICharacter>> =>
  API.post("/characters", formData);

const getCharacters = (): Promise<AxiosResponse<ICharacter[]>> => API.get("/characters");

const getShops = (): Promise<AxiosResponse<IShop[]>> => API.get("/shops");
const getProducts = (): Promise<AxiosResponse<IProduct[]>> => API.get("/products");
const getCategoriesByShop = (shopId: string): Promise<AxiosResponse<ICategory[]>> => API.get(`/categories/shop/${shopId}`);
const getProductsByCategory = (shopId: string, categoryId: string): Promise<AxiosResponse<IProduct[]>> => API.get(`/products/shop/${shopId}/${categoryId}`);

export default { login, register, createCharacter, getCharacters, getShops, getProducts, getCategoriesByShop, getProductsByCategory };
