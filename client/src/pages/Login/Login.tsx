import { Box, Button, Container, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStatus, clearState, login } from "reducers/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  // Clear Auth state when component is unmounted
  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  // Redirect the user if he is already logged in
  useEffect(() => {
    if (user) {
      navigate(RouteUrls.Home);
    }
  }, [user, navigate, dispatch]);

  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(login({ email: "test@gmaial.com", password: "insanePassword" }));
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
