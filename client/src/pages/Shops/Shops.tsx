import { Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Shops() {
  const { currentCharacter } = useAppSelector((state) => state.character);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  return (
    <>
      <Typography>Shops</Typography>
    </>
  );
}
