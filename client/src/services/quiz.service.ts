import { CreateQuizDto } from "models/quizs/create-quiz.dto";
import api from "../api";

const createQuiz = async (createQuizDto: CreateQuizDto) => (await api.createQuiz(createQuizDto)).data;

const getProfessorQuizzes = async () => (await api.getProfessorQuizzes()).data;

export default { createQuiz, getProfessorQuizzes };
