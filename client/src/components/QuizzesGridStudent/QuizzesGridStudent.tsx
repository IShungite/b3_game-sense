import { Grid, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharacterQuizzes } from "reducers/quizSlice";

export default function QuizzesGridStudent() {
  const dispatch = useAppDispatch();
  const { quizzesWithoutCorrectAnswers } = useAppSelector((state) => state.quiz);
  const { currentCharacter } = useAppSelector((state) => state.character);

  useEffect(() => {
    if (quizzesWithoutCorrectAnswers.quizDone.length === 0 && currentCharacter) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getCharacterQuizzes(currentCharacter._id));
    }
  }, [currentCharacter, dispatch, quizzesWithoutCorrectAnswers.quizDone.length]);

  return (
    <>
      <Typography variant="h5">Liste des quiz</Typography>

      <Typography>Quiz fait:</Typography>
      <Grid container direction="column">
        {quizzesWithoutCorrectAnswers.quizDone.map((quiz) => (
          <Grid item key={quiz._id}>
            <Typography>- {quiz.title}</Typography>
          </Grid>
        ))}
      </Grid>
      <Typography>Quiz restant:</Typography>
      <Grid container direction="column">
        {quizzesWithoutCorrectAnswers.quizToDo.map((quiz) => (
          <Grid item key={quiz._id}>
            <Typography>- {quiz.title}</Typography>
            <Link to={`${RouteUrls.AnswerQuiz}/${quiz._id}`}>Répondre</Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
