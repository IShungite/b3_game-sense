import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { getCharacterQuizzes } from "reducers/quizSlice";

export default function QuizzesGridStudent() {
  const dispatch = useAppDispatch();
  const { quizzesWithoutCorrectAnswers } = useAppSelector((state) => state.quiz);
  const { currentCharacter } = useAppSelector((state) => state.character);

  useEffect(() => {
    if (quizzesWithoutCorrectAnswers.length === 0 && currentCharacter) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getCharacterQuizzes(currentCharacter._id));
    }
  }, [currentCharacter, dispatch, quizzesWithoutCorrectAnswers.length]);

  return (
    <>
      <Typography variant="h5">Liste des quiz</Typography>

      <Grid container direction="column">
        {quizzesWithoutCorrectAnswers.map((quiz) => (
          <Grid item key={quiz._id}>
            <Typography>- {quiz.title} </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
