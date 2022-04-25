import { Button } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { ISubject } from "models/subjects/subject";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfessorSubjects, setCurrentSubject } from "reducers/subjectSlice";

export default function SelectSubject() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { subjects } = useAppSelector((state) => state.subject);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getProfessorSubjects());
  }, [dispatch, navigate]);

  const handleSelectSubject = (subject: ISubject) => {
    dispatch(setCurrentSubject(subject));
    navigate(RouteUrls.Subject);
  };

  return (
    <>
      {subjects.map((subject) => (
        <Button key={subject._id} onClick={() => handleSelectSubject(subject)}>
          {subject.name}
        </Button>
      ))}
    </>
  );
}
