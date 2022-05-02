import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Container component="main">
      <Outlet />
    </Container>
  );
}
