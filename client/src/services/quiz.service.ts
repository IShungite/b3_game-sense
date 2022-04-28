import { CreateQuizDto } from "models/quizs/create-quiz.dto";
import api from "../api";

const createQuiz = async (createQuizDto: CreateQuizDto) => (await api.createQuiz(createQuizDto)).data;

const getProfessorQuizzes = async () => (await api.getProfessorQuizzes()).data;

const getCharacterQuizzes = async (characterId: string) => (await api.getCharacterQuizzes(characterId)).data;

export default { createQuiz, getProfessorQuizzes, getCharacterQuizzes };
