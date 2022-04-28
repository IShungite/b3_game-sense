import { Question } from "../schema/quiz.schema";

export class CreateQuizDto {
  readonly title: string;
  readonly subjectId: string;
  readonly professorId: string;
  readonly questions: Question[];
}
