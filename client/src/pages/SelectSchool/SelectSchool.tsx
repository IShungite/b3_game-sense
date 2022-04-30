import { Box, Button, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { ISchool } from "models/schools/school";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDirectorSchools, setCurrentSchool } from "reducers/schoolSlice";

export default function SelectSchool() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { schools } = useAppSelector((state) => state.school);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getDirectorSchools());
  }, [dispatch, navigate]);

  const handleSelectSchool = (school: ISchool) => {
    dispatch(setCurrentSchool(school));
    navigate(RouteUrls.School);
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Selection de l'école</Typography>
      </Box>

      <Typography>Mes écoles</Typography>

      {schools.map((school) => (
        <Button key={school._id} onClick={() => handleSelectSchool(school)}>
          {school.name}
        </Button>
      ))}
    </>
  );
}
