import { Grade } from "src/grades/schemas/grade.schema";

export class Statistic {
  gradesBySubjects: GradesBySubject[];
  averageGrade: number;
  semesterAverage: number[];
  comparedCharacters: number[];
}

export interface GradesBySubject {
  grades: Grade[];
  subjectName: string;
  subjectAverage: number;
}
