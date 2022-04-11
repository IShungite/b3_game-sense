import { Box, Typography } from "@mui/material";
import CreateSubjectForm from "components/CreateSubjectForm/CreateSubjectForm";
import SubjectsGrid from "components/SubjectsGrid/SubjectsGrid";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Promotion() {
  const { currentPromotion } = useAppSelector((state) => state.promotion);

  if (!currentPromotion) {
    return <Navigate to={RouteUrls.School} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">{currentPromotion.name}</Typography>
      </Box>

      <SubjectsGrid />
      <CreateSubjectForm />
    </>
  );
}
