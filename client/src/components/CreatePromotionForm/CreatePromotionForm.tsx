import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import FetchStatus from "models/FetchStatus";
import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import createPromotionValidation from "models/promotions/create-promotion.validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { clearState, createPromotion } from "reducers/promotionSlice";

export default function CreatePromotionForm() {
  const dispatch = useAppDispatch();

  const { currentSchool } = useAppSelector((state) => state.school);
  const { createStatus, errorMessage } = useAppSelector((state) => state.promotion);

  const initialFormValues: CreatePromotionDto = {
    name: "",
    schoolId: currentSchool?._id || "",
  };
  const {
    register: registerFormField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: initialFormValues, resolver: yupResolver(createPromotionValidation) });

  const onSubmit = (data: CreatePromotionDto) => {
    if (currentSchool) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(createPromotion({ ...data, schoolId: currentSchool._id }));
    }
  };

  useEffect(() => {
    if (createStatus === FetchStatus.Finished) {
      reset();
      dispatch(clearState());
      alert("Promotion created");
    }
  }, [dispatch, createStatus, reset]);

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
              <Typography>Cr??er</Typography>
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
