export interface IStatistics {
  id: string;
  characterId: string;
  promotion_id: string;
  grade: number;
  subject_id: string;
}

export interface IGradesBySubject {
  grades: IStatistics[];
  subjectName: string;
  subjectAverage: number;
}

export interface IGradesBySubjects {
  gradesBySubjects: IGradesBySubject[];
  averageGrade: number;
  semesterAverage: number[];
  comparedCharacters: number[];
}

export interface GradesData {
  characterId: string;
}

export interface GradesBySubjectsData {
  characterId: string;
  promotionId: string;
}
