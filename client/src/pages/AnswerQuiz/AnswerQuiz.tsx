import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import api from "api";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { CreateAnswerDto } from "models/answers/create-answer.dto";
import createAnswerValidation from "models/answers/create-answer.validation";
import FetchStatus from "models/FetchStatus";
import { IQuizWithoutCorrectAnswer } from "models/quizzes/quiz";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { clearState, createAnswer } from "reducers/answerSlice";

export default function AnswerQuiz() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<IQuizWithoutCorrectAnswer | undefined>(undefined);

  const { currentCharacter } = useAppSelector((state) => state.character);
  const { status } = useAppSelector((state) => state.answer);

  const initialFormValues: CreateAnswerDto = {
    characterId: currentCharacter?._id ?? "",
    quizId: quizId ?? "",
    answers: [],
  };

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createAnswerValidation),
  });

  const answersWatched = watch("answers");

  useEffect(() => {
    if (quizId) {
      const fetchQuiz = async () => {
        const quizFetched = (await api.getQuizWithoutCorrectAnswer(quizId)).data;
        setQuiz(quizFetched);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchQuiz();
    }
  }, [quizId]);

  useEffect(() => {
    if (status === FetchStatus.Finished) {
      dispatch(clearState());
      navigate(RouteUrls.Home);
    }
  }, [dispatch, navigate, status]);

  const onSubmit = (data: CreateAnswerDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createAnswer(data));
  };

  if (!quizId || !currentCharacter) {
    return <Navigate to={RouteUrls.Home} />;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">{quiz.title}</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {quiz.questions.map((question, questionIndex) => (
          <Box key={question.question} sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {question.question}
            </Typography>
            <Grid container spacing={2}>
              {question.availableAnswers.map((answer, answerIndex) => (
                <Grid item key={answer.value}>
                  <Button
                    variant="outlined"
                    {...register(`answers.${questionIndex}`)}
                    onClick={() => {
                      setValue(`answers.${questionIndex}`, answerIndex);
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      trigger();
                    }}
                    disabled={answersWatched[questionIndex] === answerIndex}
                  >
                    {answer.value}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="error">
              {errors.answers && errors.answers[questionIndex]?.message}
            </Typography>
          </Box>
        ))}

        <Button type="submit" variant="contained">
          Répondre
        </Button>
      </Box>
    </>
  );
}
