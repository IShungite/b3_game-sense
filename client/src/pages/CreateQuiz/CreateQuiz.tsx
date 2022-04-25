/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CreateQuizDto } from "models/quizs/create-quiz.dto";
import createQuizValidation from "models/quizs/create-quiz.validation";
import React from "react";
import { useForm } from "react-hook-form";
import QuestionsField from "./QuestionsField";

const initialFormValues: CreateQuizDto = {
  name: "",
  questions: [
    {
      question: "",
      answers: [],
      correctAnswer: 0,
    },
  ],
};

export default function CreateQuiz() {
  const { control, register, handleSubmit, formState } = useForm<CreateQuizDto>({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createQuizValidation),
  });

  const onSubmit = (data: CreateQuizDto) => {
    console.log("submit", data);
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Nouveau Quiz</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Titre" {...register("name")} />

        <QuestionsField control={control} register={register} formState={formState} />

        <Button type="submit" variant="contained">
          Créer
        </Button>
      </Box>
    </>
  );
}
