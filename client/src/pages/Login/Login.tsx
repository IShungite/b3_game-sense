import { Box, Button, Container, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStatus, login } from "reducers/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate(RouteUrls.Home);
  }, [user, navigate]);

  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(login({ email: "test@gmail.com", password: "insanePassword" }));
  };

  return (
    <Container component="main">
      <Typography>Login</Typography>
      <Button onClick={onSubmit}>
        <Typography>Submit</Typography>
      </Button>
      {status === AuthStatus.Loading && <Box>Loading...</Box>}
      {errorMessage}
    </Container>
  );
}
