import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import api from "api";
import { AppSelect } from "components/AppSelect/AppSelect";
import { useAppDispatch, useAppSelector } from "hooks";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import createSubjectValidation from "models/subjects/create-subject.validation";
import { IUser } from "models/users/user";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSubject } from "reducers/subjectSlice";

type ProfessorType = { label: string; value: string };

export default function CreateSubjectForm() {
  const dispatch = useAppDispatch();

  const { currentPromotion } = useAppSelector((state) => state.promotion);
  const { errorMessage } = useAppSelector((state) => state.subject);

  const [professors, setProfessors] = useState<IUser[]>([]);

  const initialFormValues: CreateSubjectDto = {
    name: "",
    promotionId: "",
    professorId: "",
  };
  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    control,
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
  }, [currentPromotion, setValue]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const professorsFetched = (await api.getProfessors()).data;
      setProfessors(professorsFetched);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProfessors();
  }, []);

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
          <Grid item sx={{ width: 200 }}>
            <AppSelect<CreateSubjectDto, ProfessorType[]>
              name="professorId"
              label="Professor"
              control={control}
              options={professors.map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: user._id,
              }))}
              defaultValue=""
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