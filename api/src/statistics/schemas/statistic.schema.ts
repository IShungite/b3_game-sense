import { Grade } from "src/grades/schemas/grade.schema";

export class Statistic {
  gradesBySubjects: GradesBySubject[];
  averageGrade: number;
}

export interface GradesBySubject {
  grades: Grade[];
  subjectName: string;
  subjectAverage: number;
}
