/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IGradesBySubjects } from "models/statistics/statistics";
import React, { useEffect, useState } from "react";
import statisticsService from "services/statistics.service";

export default function Statistics() {
  const [gradessubjects, setGradesSubjects] = useState<IGradesBySubjects>();

  useEffect(() => {
    const getGradesBySubjects = async () => {
      const getGradesBySubjectsFetched = await statisticsService.getGradesBySubjects({
        character_id: "624339e3398a3c594121866b",
        promotionId: "62262ed47b4a92ceeaf9b71e",
      });
      console.log(getGradesBySubjectsFetched);
      setGradesSubjects(getGradesBySubjectsFetched);
    };

    getGradesBySubjects();
    console.log("attention");
  }, []);
  if (!gradessubjects) {
    return <div>loading...</div>;
  }

  return (
    <Container component="main">
      <Typography>Statistics</Typography>
      <TextField id="standard-basic" label="Rechercher" variant="standard" />

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {gradessubjects.averageGrade}
            <TableRow>
              {gradessubjects.gradesBySubjects.map((gradesubject) => (
                <TableCell> {gradesubject.subjectName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gradessubjects.gradesBySubjects.map((gradesubject) => (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {gradesubject.grades.map((grade) => (
                  <TableCell>{grade.grade}</TableCell>
                ))}
              </TableRow>
            ))}
            {gradessubjects.gradesBySubjects.map((gradesubject) => (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {gradesubject.subjectAverage}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
