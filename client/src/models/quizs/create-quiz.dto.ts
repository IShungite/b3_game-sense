import { Answer } from "./quiz";

export interface CreateQuizDto {
  title: string;
  subjectId: string;
  questions: CreateQuestionDto[];
}

export interface CreateQuestionDto {
  question: string;
  answers: Answer[];
  correctAnswer: number;
}
