import { Injectable } from "@nestjs/common";
import { CharactersService } from "src/characters/characters.service";
import { GradesService } from "src/grades/grades.service";
import { Grade } from "src/grades/schemas/grade.schema";
import { Subject } from "src/subjects/entities/subject.schema";
import { SubjectsService } from "src/subjects/subjects.service";
import average from "src/utils/average";
import comparision from "src/utils/comparision";
import round from "src/utils/round";

import { GradesBySubject, Statistic } from "./schemas/statistic.schema";

@Injectable()
export class StatisticsService {
  constructor(
    private readonly gradesService: GradesService,
    private readonly subjectsService: SubjectsService,
    private readonly charactersService: CharactersService,
  ) {}
  async getStatistics(characterId: string, promotionId: string): Promise<Statistic> {
    const grades = await this.gradesService.findAll({ characterId });
    console.log(characterId);
    const subjects = await this.subjectsService.findAll(promotionId);
    const gradesBySubjects = await this.getGradesBySubjects(grades, subjects);
    const comparedCharacters = await this.getComparisonCharacters(characterId);

    const averageGrade = await this.gradesService.totalAverage(characterId);
    const semesterAverage = this.getSemestersAverage(grades, subjects);

    console.log("semesterAverage", semesterAverage);

    return { gradesBySubjects, averageGrade, semesterAverage, comparedCharacters };
  }

  getSemestersAverage(grades: Grade[], subjects: Subject[]): number[] {
    const semesters = [[], []];

    subjects.forEach((subject) => {
      grades.forEach((grade) => {
        if (grade.subjectId.toString() === subject._id.toString()) {
          semesters[subject.semester - 1].push(grade); // - 1 because array index starts at 0 (there is no semester 0)
        }
      });
    });

    return semesters.map((semester) => {
      return average(semester);
    });
  }

  async getGradesBySubjects(grades: Grade[], subjects: Subject[]): Promise<GradesBySubject[]> {
    const gradesBySubjects: GradesBySubject[] = [];

    subjects.forEach((subject) => {
      const subjectName = subject.name;
      const gradesBySubject: Grade[] = grades.filter((grade) => {
        return grade.subjectId.toString() === subject._id.toString();
      });

      const averageSubjectGrade = average(gradesBySubject);

      gradesBySubjects.push({
        grades: gradesBySubject,
        subjectName,
        subjectAverage: averageSubjectGrade,
      });
    });
    return gradesBySubjects;
  }

  async getComparisonCharacters(characterId: string) {
    const currentCharacter = await this.charactersService.findOne({ _id: characterId });
    console.log("currentCharacter", currentCharacter, "characterId", characterId);
    const currentAllCharacters = await this.charactersService.findAll(currentCharacter.userId.toString());

    const averageCurrentCharacter = await this.gradesService.totalAverage(currentCharacter._id.toString());
    const comparedResult: number[] = [];

    const allCharactersWithoutCurrent = currentAllCharacters.filter(
      (character) => character._id.toString() !== currentCharacter._id.toString(),
    );

    const averageComparedCharactersPromises = allCharactersWithoutCurrent.map((character) => {
      return this.gradesService.totalAverage(character._id.toString());
    });

    const averageComparedCharacters = await Promise.all(averageComparedCharactersPromises);

    averageComparedCharacters.forEach((averageComparedCharacter, index) => {
      const char = allCharactersWithoutCurrent[index];
      const result = round(comparision(averageCurrentCharacter, averageComparedCharacter), 2);
      comparedResult.push(result);
    });
    return comparedResult;
  }
}
