import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { CreateQuizDto } from "models/quizzes/create-quiz.dto";
import React from "react";
import { Control, FormState, useFieldArray, UseFormRegister } from "react-hook-form";
import AnswersField from "./AnswersField";

export default function QuestionsField({
  control,
  register,
  formState,
}: {
  control: Control<CreateQuizDto, any>;
  register: UseFormRegister<CreateQuizDto>;
  formState: FormState<CreateQuizDto>;
}) {
  const { fields: questionsList, append: appendQuestion } = useFieldArray<CreateQuizDto>({
    name: "questions",
    control,
  });

  return (
    <Box>
      <Box>
        {questionsList.map((question, index) => (
          <Box key={question.id} sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
              Question {index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Question"
                  helperText={formState.errors.questions && formState.errors.questions[index]?.question?.message}
                  {...register(`questions.${index}.question`)}
                />
              </Grid>
              <Grid item sm={12}>
                <AnswersField control={control} register={register} formState={formState} questionIndex={index} />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Réponse juste"
                  type="number"
                  helperText={formState.errors.questions && formState.errors.questions[index]?.correctAnswer?.message}
                  {...register(`questions.${index}.correctAnswer`)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
      <Button
        onClick={() => {
          appendQuestion({});
        }}
      >
        Nouvelle question
      </Button>
    </Box>
  );
}
