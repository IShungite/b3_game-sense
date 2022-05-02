import { Grade } from "src/grades/schemas/grade.schema";
import round from "./round";

export default function average(grades: Grade[]): number {
  if (grades.length === 0) {
    return -1;
  }

  let sum_grades = 0;

  grades.forEach((grade) => {
    sum_grades += grade.grade;
  });

  return round(sum_grades / grades.length, 2);
}
