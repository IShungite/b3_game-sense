import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import api from "api";
import { AppSelect } from "components/AppSelect/AppSelect";
import { useAppDispatch, useAppSelector } from "hooks";
import FetchStatus from "models/FetchStatus";
import { CreateSchoolDto } from "models/schools/create-school.dto";
import createSchoolValidation from "models/schools/create-school.validation";
import { IUser } from "models/users/user";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { clearState, createSchool } from "reducers/schoolSlice";

type DirectorType = { label: string; value: string };

export default function CreateSchool() {
  const dispatch = useAppDispatch();

  const { createStatus, errorMessage } = useAppSelector((state) => state.school);

  const [directors, setDirectors] = useState<IUser[]>([]);

  const initialFormValues: CreateSchoolDto = {
    name: "",
    directorId: "",
  };

  const {
    register: registerFormField,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createSchoolValidation),
  });

  const onSubmit = (data: CreateSchoolDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createSchool(data));
  };

  useEffect(() => {
    const fetchDirectors = async () => {
      const directorsFetched = (await api.getDirectors()).data;
      setDirectors(directorsFetched);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchDirectors();
  }, []);

  useEffect(() => {
    if (createStatus === FetchStatus.Finished) {
      reset();
      dispatch(clearState());
      alert("School created");
    }
  }, [dispatch, reset, createStatus]);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Nouvelle école
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              label="Nom de l'école"
              variant="outlined"
              error={Boolean(errors.name)}
              defaultValue={initialFormValues.name}
              helperText={errors.name?.message}
              {...registerFormField("name")}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <AppSelect<CreateSchoolDto, DirectorType[]>
              name="directorId"
              label="Directeur"
              control={control}
              options={directors.map((user) => ({
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
