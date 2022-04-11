import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PORT, API_URL } from "config";
import { IAuthUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import { ICourse } from "models/courses/course";
import { CreateCourseDto } from "models/courses/create-course.dto";
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

const createCharacter = (formData: CreateCharacterDto): Promise<AxiosResponse<ICharacter>> =>
  API.post("/characters", formData);

const getCharacters = (): Promise<AxiosResponse<ICharacter[]>> => API.get("/characters");

const createSchool = (formData: CreateSchoolDto): Promise<AxiosResponse<ISchool>> => API.post("/schools", formData);
const getSchools = (): Promise<AxiosResponse<ISchool[]>> => API.get("/schools");

const createCourse = (formData: CreateCourseDto): Promise<AxiosResponse<ICourse>> => API.post("/courses", formData);
const getCourses = (schoolId: string): Promise<AxiosResponse<ICourse[]>> => API.post("/courses/getAll", { schoolId });

const createSubject = (formData: CreateSubjectDto): Promise<AxiosResponse<ISubject>> => API.post("/subjects", formData);
const getSubjects = (courseId: string): Promise<AxiosResponse<ISubject[]>> =>
  API.post("/subjects/getAll", { courseId });

export default {
  login,
  register,
  getDirectors,
  createCharacter,
  getCharacters,
  getSchools,
  createSchool,
  getCourses,
  createCourse,
  getSubjects,
  createSubject,
};
