import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { IAnswer } from "models/answers/answer";
import { CreateAnswerDto } from "models/answers/create-answer.dto";
import { IAuthUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { ICategory } from "models/category/category";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import { IStarterItems } from "models/items/item";
import { IProduct } from "models/products/products";
import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import { IPromotion } from "models/promotions/promotion";
import { CreateQuizDto } from "models/quizzes/create-quiz.dto";
import { IQuiz, IQuizWithoutCorrectAnswer } from "models/quizzes/quiz";
import { CreateSchoolDto } from "models/schools/create-school.dto";
import { ISchool } from "models/schools/school";
import { IShop } from "models/shops/shop";
import { GradesBySubjectsData, GradesData, IGradesBySubjects, IStatistics } from "models/statistics/statistics";
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

const getGrades = (paramCharacterId: GradesData): Promise<AxiosResponse<IStatistics[]>> =>
  API.post("/grades/getAll", paramCharacterId);
const getAverage = (paramCharacterId: GradesData): Promise<AxiosResponse<number>> =>
  API.post("grades/getAverage", paramCharacterId);
const getGradesBySubjects = (paramsGrades: GradesBySubjectsData): Promise<AxiosResponse<IGradesBySubjects>> =>
  API.post("/statistics/", paramsGrades);

const login = (formData: LoginCredentialsDto): Promise<AxiosResponse<IAuthUser>> => API.post("/auth/login", formData);
const register = (formData: RegisterCredentialsDto): Promise<AxiosResponse<IAuthUser>> =>
  API.post("/auth/register", formData);

const getDirectors = (): Promise<AxiosResponse<IUser[]>> => API.get("/users/directors");
const getProfessors = (): Promise<AxiosResponse<IUser[]>> => API.get("/users/professors");

const createCharacter = (formData: CreateCharacterDto): Promise<AxiosResponse<ICharacter>> =>
  API.post("/characters", formData);

const getCharacters = (): Promise<AxiosResponse<ICharacter[]>> => API.get("/characters");
const getStarterItems = (): Promise<AxiosResponse<IStarterItems>> => API.get("/items/starters");

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

const getShops = (): Promise<AxiosResponse<IShop[]>> => API.get("/shops");
const getProducts = (): Promise<AxiosResponse<IProduct[]>> => API.get("/products");
const getCategoriesByShop = (shopId: string): Promise<AxiosResponse<ICategory[]>> =>
  API.get(`/categories/shop/${shopId}`);
const getProductsByCategory = (shopId: string, categoryId: string): Promise<AxiosResponse<IProduct[]>> =>
  API.get(`/products/shop/${shopId}/${categoryId}`);

const createQuiz = (createQuizDto: CreateQuizDto): Promise<AxiosResponse<IQuiz>> => API.post("/quizzes", createQuizDto);
const getProfessorQuizzes = (): Promise<AxiosResponse<IQuiz[]>> => API.get("/quizzes/getByProfessor");
const getCharacterQuizzes = (
  characterId: string,
): Promise<AxiosResponse<{ quizDone: IQuizWithoutCorrectAnswer[]; quizToDo: IQuizWithoutCorrectAnswer[] }>> =>
  API.post("/quizzes/getByCharacter", { characterId });
const getQuizWithoutCorrectAnswer = (quizId: string): Promise<AxiosResponse<IQuizWithoutCorrectAnswer>> =>
  API.get(`/quizzes/getQuizWithoutCorrectAnswer/${quizId}`);

const createAnswer = (createAnswerDto: CreateAnswerDto): Promise<AxiosResponse<IAnswer>> =>
  API.post("/answers", createAnswerDto);

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
  getGrades,
  getAverage,
  getGradesBySubjects,
  getStarterItems,
  getShops,
  getProducts,
  getCategoriesByShop,
  getProductsByCategory,
  createQuiz,
  getProfessorQuizzes,
  getCharacterQuizzes,
  getQuizWithoutCorrectAnswer,
  createAnswer,
};
