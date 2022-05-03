export class CreateGradeDto {
  readonly characterId: string;
  readonly subjectId: string;
  readonly quizId: string;
  readonly grade: number;
}
