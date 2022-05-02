import { Injectable } from "@nestjs/common";
import { GradesService } from "src/grades/grades.service";
import { Grade } from "src/grades/schemas/grade.schema";
import { Subject } from "src/subjects/entities/subject.schema";
import { SubjectsService } from "src/subjects/subjects.service";

import { GradesBySubject, Statistic } from "./schemas/statistic.schema";

@Injectable()
export class StatisticsService {
  constructor(private readonly gradesService: GradesService, private readonly subjectsService: SubjectsService) {}
  async getStatistics(characterId: string, promotionId: string): Promise<Statistic> {
    const grades = await this.gradesService.findAll({ characterId });
    const subjects = await this.subjectsService.findAll(promotionId);
    const gradesBySubjects = await this.getGradesBySubjects(grades, subjects);

    const averageGrade = await this.gradesService.totalAverage(characterId);
    const semesterAverage1 = this.getSemesterAverage(grades, subjects, 1);
    const semesterAverage2 = this.getSemesterAverage(grades, subjects, 2);
    return { gradesBySubjects, averageGrade, semesterAverage1, semesterAverage2 };
  }

  getSemesterAverage(grades: Grade[], subjects: Subject[], semester: number): number {
    const gradesSemester: Grade[] = [];
    console.log(subjects);
    subjects.map((subject) => {
      console.log(subject.semester);
      if (subject.semester === semester) {
        grades.forEach((grade) => {
          if (grade.subjectId.toString() === subject._id.toString()) {
            gradesSemester.push(grade);
          }
        });
      }
    });
    return this.gradesService.average(gradesSemester);
  }

  async getGradesBySubjects(grades: Grade[], subjects: Subject[]): Promise<GradesBySubject[]> {
    // Créer le tableau GradesBySubjects
    const gradesBySubjects: GradesBySubject[] = [];
    // Récupère toutes les matières avec le promotion_id du character

    //const subjectsId = getGrades.map((grade) => this.subjectsService.findOne(grade.subjectId));

    subjects.map((subject) => {
      const subjectName = subject.name;
      const gradesBySubject: Grade[] = grades.filter((grade) => {
        // console.log("grade.subjectId :" + grade.subjectId, "subject._id :" + subject._id.toString());

        return grade.subjectId.toString() === subject._id.toString();
      });

      let sum_grades = 0;
      let averageSubjectGrade = 0;

      gradesBySubject.map((grade) => {
        if (grade.grade) {
          sum_grades += grade.grade;
        }

        averageSubjectGrade = sum_grades / gradesBySubject.length;
        return averageSubjectGrade;
      });
      // console.log("gradesBySubject" + gradesBySubject);

      gradesBySubjects.push({
        grades: gradesBySubject,
        subjectName,
        subjectAverage: averageSubjectGrade,
      });
    });
    return gradesBySubjects;
  }
}
