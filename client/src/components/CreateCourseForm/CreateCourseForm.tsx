import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { CreateCourseDto } from "models/course/create-course.dto";
import createCourseValidation from "models/course/create-course.validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { clearState } from "reducers/authSlice";
import { createCourse } from "reducers/courseSlice";

export default function CreateCourseForm() {
  const dispatch = useAppDispatch();

  const { currentSchool } = useAppSelector((state) => state.school);
  const { errorMessage } = useAppSelector((state) => state.course);

  const initialFormValues: CreateCourseDto = {
    name: "",
    schoolId: "",
  };
  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: initialFormValues, resolver: yupResolver(createCourseValidation) });

  // Clear Auth state when component is unmounted
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const onSubmit = (data: CreateCourseDto) => {
    if (currentSchool) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(createCourse({ ...data, schoolId: currentSchool._id }));
    }
  };

  useEffect(() => {
    if (currentSchool) {
      setValue("schoolId", currentSchool._id);
    }
  });

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Nouvelle classe
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
            <Typography>{errors.schoolId?.message}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
