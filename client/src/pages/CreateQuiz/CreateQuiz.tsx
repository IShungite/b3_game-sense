/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AppSelect } from "components/AppSelect/AppSelect";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import FetchStatus from "models/FetchStatus";
import { CreateQuizDto } from "models/quizzes/create-quiz.dto";
import createQuizValidation from "models/quizzes/create-quiz.validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clearState, createQuiz } from "reducers/quizSlice";
import { getProfessorSubjects, setCurrentSubject } from "reducers/subjectSlice";
import QuestionsField from "./QuestionsField";

const initialFormValues: CreateQuizDto = {
  title: "",
  subjectId: "",
  questions: [
    {
      question: "",
      availableAnswers: [{ value: "" }, { value: "" }],
      correctAnswer: 0,
    },
  ],
};

export default function CreateQuiz() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { subjects } = useAppSelector((state) => state.subject);

  const { createStatus } = useAppSelector((state) => state.quiz);

  const { control, getValues, register, handleSubmit, formState } = useForm<CreateQuizDto>({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createQuizValidation),
  });

  const onSubmit = (data: CreateQuizDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createQuiz(data));
  };

  useEffect(() => {
    if (subjects.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getProfessorSubjects());
    }
  }, [dispatch, subjects.length]);

  // redirect the user to the subject page after the quiz has been created
  useEffect(() => {
    if (createStatus === FetchStatus.Finished) {
      console.log("finished");
      const currentSubject = subjects.find((subject) => getValues().subjectId === subject._id);
      if (currentSubject) {
        dispatch(setCurrentSubject(currentSubject));
      }
      dispatch(clearState());
      navigate(RouteUrls.Subject);
    }
  }, [dispatch, getValues, navigate, createStatus, subjects, subjects.length]);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Nouveau Quiz</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Titre" {...register("title")} helperText={formState.errors.title?.message} sx={{ mb: 2 }} />
        <AppSelect<CreateQuizDto, { label: string; value: string }[]>
          name="subjectId"
          label="Matière"
          control={control}
          options={subjects.map((subject) => ({
            label: subject.name,
            value: subject._id,
          }))}
          defaultValue=""
        />

        <QuestionsField control={control} register={register} formState={formState} />

        <Button type="submit" variant="contained">
          Créer
        </Button>
      </Box>
    </>
  );
}
