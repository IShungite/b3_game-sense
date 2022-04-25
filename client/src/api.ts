import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { LoginData, RegisterData, User } from "models/auth";
import { GradesBySubjectsData, GradesData, IGradesBySubjects, IStatistics } from "models/statistics/statistics";

const API = axios.create({ baseURL: `${API_URL}:${API_PORT}` });

API.interceptors.request.use((req: AxiosRequestConfig) => {
  const storageUser = localStorage.getItem("user");

  if (storageUser) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: User = JSON.parse(storageUser);
    if (user && user.access_token && req.headers) {
      req.headers.Authorization = `Bearer ${user.access_token}`;
    }
  }
  return req;
});

const login = (formData: LoginData): Promise<AxiosResponse<User>> => API.post("/auth/login", formData);
const register = (formData: RegisterData): Promise<AxiosResponse<User>> => API.post("/auth/register", formData);
const getGrades = (paramCharacterId: GradesData): Promise<AxiosResponse<IStatistics[]>> =>
  API.post("/grades/getAll", paramCharacterId);
const getAverage = (paramCharacterId: GradesData): Promise<AxiosResponse<number>> =>
  API.post("grades/getAverage", paramCharacterId);
const getGradesBySubjects = (paramsGrades: GradesBySubjectsData): Promise<AxiosResponse<IGradesBySubjects>> =>
  API.post("/statistics/", paramsGrades);

export default { login, register, getGrades, getAverage, getGradesBySubjects };
