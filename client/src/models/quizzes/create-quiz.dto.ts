import { AvailableAnswer } from "./quiz";

export interface CreateQuizDto {
  title: string;
  subjectId: string;
  questions: CreateQuestionDto[];
}

export interface CreateQuestionDto {
  question: string;
  availableAnswers: AvailableAnswer[];
  correctAnswer: number;
}
