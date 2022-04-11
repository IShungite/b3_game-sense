import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import createSubjectValidation from "models/subjects/create-course.validation";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSubject } from "reducers/subjectSlice";

export default function CreateSubjectForm() {
  const dispatch = useAppDispatch();

  const { currentCourse } = useAppSelector((state) => state.course);
  const { errorMessage } = useAppSelector((state) => state.subject);

  const initialFormValues: CreateSubjectDto = {
    name: "",
    courseId: "",
  };
  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: initialFormValues, resolver: yupResolver(createSubjectValidation) });

  const onSubmit = (data: CreateSubjectDto) => {
    if (currentCourse) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(createSubject({ ...data, courseId: currentCourse._id }));
    }
  };

  useEffect(() => {
    if (currentCourse) {
      setValue("courseId", currentCourse._id);
    }
  });

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Nouvelle matière
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              label="Nom de la classe"
              variant="outlined"
              error={Boolean(errors.name)}
              defaultValue={initialFormValues.name}
              helperText={errors.name?.message}
              {...registerFormField("name")}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              <Typography>Créer</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Typography>{errorMessage}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
