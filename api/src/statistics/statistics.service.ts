import { Injectable } from "@nestjs/common";
import { GradesService } from "src/grades/grades.service";
import { Grade } from "src/grades/schemas/grade.schema";
import { SubjectsService } from "src/subjects/subjects.service";

import { GradesBySubject, Statistic } from "./schemas/statistic.schema";

@Injectable()
export class StatisticsService {
  constructor(private readonly gradesService: GradesService, private readonly subjectsService: SubjectsService) {}
  async getStatistics(characterId: string, promotionId: string): Promise<Statistic> {
    const gradesBySubjects = await this.getGradesBySubjects(characterId, promotionId);

    const averageGrade = await this.gradesService.average(characterId);

    return { gradesBySubjects, averageGrade };
  }

  async getGradesBySubjects(characterId: string, promotionId: string): Promise<GradesBySubject[]> {
    // Créer le tableau GradesBySubjects
    const gradesBySubjects: GradesBySubject[] = [];
    // Récupère toutes les matières avec le promotion_id du character
    const getGrades = await this.gradesService.findAll({ characterId });
    const getSubjects = await this.subjectsService.findAll(promotionId);
    console.log("getGrades :" + getGrades, "           getSubject :" + getSubjects);

    //const subjectsId = getGrades.map((grade) => this.subjectsService.findOne(grade.subjectId));

    getSubjects.map((subject) => {
      const subjectName = subject.name;

      const gradesBySubject: Grade[] = getGrades.filter((grade) => {
        // console.log("grade.subjectId :" + grade.subjectId, "subject._id :" + subject._id.toString());
        console.log(grade);
        return grade.subjectId.toString() === subject._id.toString();
      });
      let sum_grades = 0;
      let averageSubjectGrade = 0;
      gradesBySubject.map((grade) => {
        sum_grades += grade.grade;

        averageSubjectGrade = sum_grades / gradesBySubject.length;
        console.log(averageSubjectGrade);
        return averageSubjectGrade;
      });
      console.log("gradesBySubject" + gradesBySubject);

      gradesBySubjects.push({ grades: gradesBySubject, subjectName, subjectAverage: averageSubjectGrade });
    });
    // Loop à travers toutes les matières
    // for (let i = 0; i < getSubjects.length; i++) {
    //   // Récupère le nom de la matière
    //   // Récupère les notes de cette matière
    //   // push GradesBySubject dans GradesBySubjects
    // }

    // return GradesBySubjects
    console.log(gradesBySubjects);
    return gradesBySubjects;
  }
}
