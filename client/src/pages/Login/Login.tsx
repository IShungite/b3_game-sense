import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { LoginData } from "models/auth";
import { loginValidationSchema } from "models/validation/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthStatus, clearState, login } from "reducers/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const {
    register: registerFormField,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: initialValues, resolver: yupResolver(loginValidationSchema) });

  // Clear Auth state when component is unmounted
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  // Redirect the user if he is already logged in
  useEffect(() => {
    if (user) {
      navigate(RouteUrls.Home);
    }
  }, [user, navigate]);

  const onSubmit = (data: LoginData) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(login(data));
  };

  return (
    <Container component="main">
      <Typography>Login</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              error={Boolean(errors.email)}
              defaultValue={initialValues.email}
              helperText={errors.email?.message}
              {...registerFormField("email")}
            />{" "}
          </Grid>
          <Grid item>
            <TextField
              label="Mot de passe"
              variant="outlined"
              type="password"
              error={Boolean(errors.password)}
              defaultValue={initialValues.password}
              helperText={errors.password?.message}
              {...registerFormField("password")}
            />
          </Grid>
        </Grid>
        <Typography>{errorMessage}</Typography>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
      </Box>
      {status === AuthStatus.Loading && <Box>Loading...</Box>}
    </Container>
  );
}