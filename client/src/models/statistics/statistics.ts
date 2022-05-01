export interface IStatistics {
  id: string;
  character_id: string;
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
  averageGrade: number;
  gradesBySubjects: IGradesBySubject[];
}

export interface GradesData {
  character_id: string;
}

export interface GradesBySubjectsData {
  character_id: string;
  promotionId: string;
}
