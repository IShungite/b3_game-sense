import { Box, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

export default function School() {
  const { currentSchool } = useAppSelector((state) => state.school);

  if (!currentSchool) {
    return <Navigate to={RouteUrls.SelectSchool} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">{currentSchool.name}</Typography>
      </Box>
    </>
  );
}
