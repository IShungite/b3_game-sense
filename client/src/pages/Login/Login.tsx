import { Box, Button, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { AuthStatus, login } from "reducers/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();

  const { status, errorMessage } = useAppSelector((state) => state.auth);

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
