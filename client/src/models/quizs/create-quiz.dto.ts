import { Answer } from "./quiz";

export interface CreateQuizDto {
  name: string;
  questions: CreateQuestionDto[];
}

export interface CreateQuestionDto {
  question: string;
  answers: Answer[];
  correctAnswer: number;
}
