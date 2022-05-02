import { Box, Typography } from "@mui/material";
import Character from "components/Character/Character";
import QuizzesGridStudent from "components/QuizzesGridStudent/QuizzesGridStudent";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const { currentCharacter } = useAppSelector((state) => state.character);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Home</Typography>
      </Box>

      <Typography variant="h4">{currentCharacter.nickname}</Typography>

      <Character equipments={currentCharacter.equipments} />

      <QuizzesGridStudent />

      <Link to={RouteUrls.UpdateCharacter}>Modifier le personnage</Link>
    </>
  );
}
