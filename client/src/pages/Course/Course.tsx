import { Box, Typography } from "@mui/material";
import CreateSubjectForm from "components/CreateSubjectForm/CreateSubjectForm";
import SubjectsGrid from "components/SubjectsGrid/SubjectsGrid";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Course() {
  const { currentCourse } = useAppSelector((state) => state.course);

  if (!currentCourse) {
    return <Navigate to={RouteUrls.School} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">{currentCourse.name}</Typography>
      </Box>

      <SubjectsGrid />
      <CreateSubjectForm />
    </>
  );
}
