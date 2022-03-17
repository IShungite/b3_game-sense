import { Container, Typography } from "@mui/material";
import React from "react";
import items from "../../../public/items.json";

export default function Index() {
  return (
    <Container component="main">
      <Typography>Index</Typography>
      <img src={items[1].image} alt="img test" />
    </Container>
  );
}
