import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
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
  const {
    fields: questionsList,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray<CreateQuizDto>({
    name: "questions",
    control,
  });

  return (
    <Box>
      <Box>
        {questionsList.map((question, index) => (
          <Box key={question.id} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="flex-start">
              <Typography variant="h4" gutterBottom>
                Question {index + 1}
              </Typography>
              <IconButton onClick={() => removeQuestion(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
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
                  label="Numéro de la réponse juste"
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
          appendQuestion({ correctAnswer: 0, availableAnswers: [{ value: "" }, { value: "" }] });
        }}
      >
        Nouvelle question
      </Button>
    </Box>
  );
}
