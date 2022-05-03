/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Container, Grid, TableContainer, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import { IGradesBySubjects } from "models/statistics/statistics";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import statisticsService from "services/statistics.service";

export default function Statistics() {
  const [gradessubjects, setGradesSubjects] = useState<IGradesBySubjects>();
  const { currentCharacter } = useAppSelector((state) => state.character);

  useEffect(() => {
    const getGradesBySubjects = async () => {
      if (currentCharacter) {
        const gradesBySubjectsFetched = await statisticsService.getGradesBySubjects({
          characterId: currentCharacter._id,
          promotionId: currentCharacter.promotionId,
        });

        console.log(gradesBySubjectsFetched);
        setGradesSubjects(gradesBySubjectsFetched);
      }
    };

    getGradesBySubjects();
  }, [currentCharacter]);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  if (!gradessubjects) {
    return <div>loading...</div>;
  }
  if (gradessubjects.gradesBySubjects.length === 0) {
    return (
      <Container component="main">
        <Typography>Statistics</Typography>
        <Typography>Pas de notes trouvées</Typography>;
      </Container>
    );
  }

  return (
    <Container component="main">
      <Typography>Statistics</Typography>
      {console.log("gradessubjects: ", gradessubjects, gradessubjects.comparedCharacters)}
      <Grid container>
        {gradessubjects.gradesBySubjects.map((gradesubject) => (
          <Grid item sx={{ mr: 2 }} display="flex" flexDirection="column" alignItems="center">
            <Box sx={{ fontSize: "1.2rem" }}> {gradesubject.subjectName}</Box>

            <Box>
              {gradesubject.grades.map((grade) => (
                <Box>{grade.grade}</Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <TableContainer>
        {gradessubjects.semesterAverage.map(
          (semesterValue, index) =>
            semesterValue !== -1 && (
              <Typography>
                Semestre {index + 1} Moyenne : {semesterValue}/20
              </Typography>
            ),
        )}

        {gradessubjects.comparedCharacters.length > 0 ? (
          gradessubjects.comparedCharacters.map((difference, index) => (
            <Typography>
              Année N-{index + 1} : Changement de {difference}% dans les notes
            </Typography>
          ))
        ) : (
          <Typography>Pas de comparaison</Typography>
        )}
      </TableContainer>
    </Container>
  );
}
