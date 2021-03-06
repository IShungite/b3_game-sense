import { Box, Typography } from "@mui/material";
import CharactersGrid from "components/CharactersGrid/CharactersGrid";
import QuizzesGrid from "components/QuizzesGrid/QuizzesGrid";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Subject() {
  const { currentSubject } = useAppSelector((state) => state.subject);

  if (!currentSubject) {
    return <Navigate to={RouteUrls.SelectSubject} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">{currentSubject.name}</Typography>
      </Box>

      <CharactersGrid />

      <QuizzesGrid />
    </>
  );
}
