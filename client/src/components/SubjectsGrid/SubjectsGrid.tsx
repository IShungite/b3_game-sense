import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { getSubjects } from "reducers/subjectSlice";

export default function SubjectsGrid() {
  const dispatch = useAppDispatch();
  const { subjects, errorMessage } = useAppSelector((state) => state.subject);
  const { currentPromotion } = useAppSelector((state) => state.promotion);

  useEffect(() => {
    if (subjects.length === 0 && currentPromotion) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getSubjects(currentPromotion._id));
    }
  }, [dispatch, subjects.length, currentPromotion]);

  return (
    <>
      <Typography variant="h5">Liste des matières</Typography>
      <Typography>{errorMessage}</Typography>

      <Grid container direction="column">
        {subjects.map((subject) => (
          <Grid item key={subject.name}>
            <Typography>- {subject.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
