import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { getProfessorQuizzes } from "reducers/quizSlice";

export default function QuizzesGrid() {
  const dispatch = useAppDispatch();
  const { quizzes } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    if (quizzes.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getProfessorQuizzes());
    }
  }, [dispatch, quizzes.length]);

  return (
    <>
      <Typography variant="h5">Liste des quiz</Typography>

      <Grid container direction="column">
        {quizzes.map((quiz) => (
          <Grid item key={quiz._id}>
            <Typography>- {quiz.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
