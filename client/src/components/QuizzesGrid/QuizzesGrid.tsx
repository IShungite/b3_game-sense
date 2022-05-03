import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { getProfessorQuizzes } from "reducers/quizSlice";

export default function QuizzesGrid() {
  const dispatch = useAppDispatch();
  const { quizzes } = useAppSelector((state) => state.quiz);
  const { currentSubject } = useAppSelector((state) => state.subject);

  useEffect(() => {
    if (quizzes.length === 0 && currentSubject?._id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getProfessorQuizzes(currentSubject._id));
    }
  }, [currentSubject?._id, dispatch, quizzes.length]);

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
