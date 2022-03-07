import { Container,Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container component="main">
      <Typography>Home</Typography>

      {user && <Link to={RouteUrls.CreateCharacter}>Create new character</Link>}
    </Container>
  );
}
