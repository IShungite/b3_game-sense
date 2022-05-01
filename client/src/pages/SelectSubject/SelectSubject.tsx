import { Box, Button, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { ISubject } from "models/subjects/subject";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearQuizzes } from "reducers/quizSlice";
import { getProfessorSubjects, setCurrentSubject } from "reducers/subjectSlice";

export default function SelectSubject() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { subjects } = useAppSelector((state) => state.subject);

  useEffect(() => {
    if (subjects.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getProfessorSubjects());
    }
  }, [dispatch, subjects.length]);

  const handleSelectSubject = (subject: ISubject) => {
    dispatch(setCurrentSubject(subject));
    dispatch(clearQuizzes());
    navigate(RouteUrls.Subject);
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Selection de la matière</Typography>
      </Box>

      <Typography>Mes matières</Typography>
      {subjects.map((subject) => (
        <Button key={subject._id} onClick={() => handleSelectSubject(subject)}>
          {subject.name}
        </Button>
      ))}
    </>
  );
}
