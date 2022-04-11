import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import createSubjectValidation from "models/subjects/create-subject.validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSubject } from "reducers/subjectSlice";

export default function CreateSubjectForm() {
  const dispatch = useAppDispatch();

  const { currentPromotion } = useAppSelector((state) => state.promotion);
  const { errorMessage } = useAppSelector((state) => state.subject);

  const initialFormValues: CreateSubjectDto = {
    name: "",
    promotionId: "",
  };
  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: initialFormValues, resolver: yupResolver(createSubjectValidation) });

  const onSubmit = (data: CreateSubjectDto) => {
    if (currentPromotion) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(createSubject({ ...data, promotionId: currentPromotion._id }));
    }
  };

  useEffect(() => {
    if (currentPromotion) {
      setValue("promotionId", currentPromotion._id);
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
