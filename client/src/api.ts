import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { IAuthUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import { IPromotion } from "models/promotions/promotion";
import { CreateSchoolDto } from "models/schools/create-school.dto";
import { ISchool } from "models/schools/school";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import { ISubject } from "models/subjects/subject";
import { IUser } from "models/users/user";
import { getUserFromLocalStorage } from "services/auth.service";

const API = axios.create({ baseURL: `${API_URL}:${API_PORT}` });

API.interceptors.request.use((req: AxiosRequestConfig) => {
  const user = getUserFromLocalStorage();

  if (user && req.headers) {
    req.headers.Authorization = `Bearer ${user.access_token}`;
  }

  return req;
});

const login = (formData: LoginCredentialsDto): Promise<AxiosResponse<IAuthUser>> => API.post("/auth/login", formData);
const register = (formData: RegisterCredentialsDto): Promise<AxiosResponse<IAuthUser>> =>
  API.post("/auth/register", formData);

const getDirectors = (): Promise<AxiosResponse<IUser[]>> => API.get("/users/directors");
const getProfessors = (): Promise<AxiosResponse<IUser[]>> => API.get("/users/professors");

const createCharacter = (formData: CreateCharacterDto): Promise<AxiosResponse<ICharacter>> =>
  API.post("/characters", formData);

const getCharacters = (): Promise<AxiosResponse<ICharacter[]>> => API.get("/characters");
const getCharactersFromPromotion = (promotionId: string): Promise<AxiosResponse<ICharacter[]>> =>
  API.get(`/characters/promotion/${promotionId}`);

const createSchool = (formData: CreateSchoolDto): Promise<AxiosResponse<ISchool>> => API.post("/schools", formData);
const getSchools = (): Promise<AxiosResponse<ISchool[]>> => API.get("/schools");
const getDirectorSchools = (): Promise<AxiosResponse<ISchool[]>> => API.get("/schools/getDirectorSchools");

const createPromotion = (formData: CreatePromotionDto): Promise<AxiosResponse<IPromotion>> =>
  API.post("/promotions", formData);
const getPromotions = (schoolId: string): Promise<AxiosResponse<IPromotion[]>> =>
  API.post("/promotions/getAll", { schoolId });

const createSubject = (formData: CreateSubjectDto): Promise<AxiosResponse<ISubject>> => API.post("/subjects", formData);
const getSubjects = (promotionId: string): Promise<AxiosResponse<ISubject[]>> =>
  API.post("/subjects/getAll", { promotionId });
const getProfessorSubjects = (): Promise<AxiosResponse<ISubject[]>> => API.get("/subjects/getProfessorSubjects");

export default {
  login,
  register,
  getDirectors,
  getProfessors,
  createCharacter,
  getCharacters,
  getCharactersFromPromotion,
  getSchools,
  getDirectorSchools,
  createSchool,
  getPromotions,
  createPromotion,
  getSubjects,
  createSubject,
  getProfessorSubjects,
};
