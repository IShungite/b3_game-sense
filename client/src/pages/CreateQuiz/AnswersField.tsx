import { Box, Button, Grid, TextField } from "@mui/material";
import { CreateQuizDto } from "models/quizs/create-quiz.dto";
import React from "react";
import { Control, FormState, useFieldArray, UseFormRegister } from "react-hook-form";

export default function AnswersField({
  questionIndex,
  control,
  register,
  formState,
}: {
  questionIndex: number;
  control: Control<CreateQuizDto, any>;
  register: UseFormRegister<CreateQuizDto>;
  formState: FormState<CreateQuizDto>;
}) {
  const { fields, append } = useFieldArray({ name: `questions.${questionIndex}.answers`, control });

  return (
    <Box>
      <Grid container spacing={1}>
        {fields.map((answer, index) => (
          <Grid item key={answer.id} sx={{ mt: 2 }}>
            <TextField
              label={`Réponse ${index}`}
              helperText={
                formState.errors?.questions &&
                formState.errors.questions[questionIndex]?.answers &&
                formState.errors.questions[questionIndex]?.answers[index] &&
                formState.errors?.questions[questionIndex]?.answers[index]?.value?.message
              }
              {...register(`questions.${questionIndex}.answers.${index}.value`)}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        onClick={() => {
          append({ value: "" });
        }}
      >
        Ajouter une réponse
      </Button>
    </Box>
  );
}