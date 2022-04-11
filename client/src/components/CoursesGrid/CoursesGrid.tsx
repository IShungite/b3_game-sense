import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { ICourse } from "models/course/course";
import React, { useEffect } from "react";
import { getCourses } from "reducers/courseSlice";

export default function CoursesGrid() {
  const dispatch = useAppDispatch();
  const { courses, errorMessage } = useAppSelector((state) => state.course);
  const { currentSchool } = useAppSelector((state) => state.school);

  const handleCreateCourse = (course: ICourse) => {};

  useEffect(() => {
    if (courses.length === 0 && currentSchool) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getCourses(currentSchool._id));
    }
  }, [dispatch, courses.length, currentSchool]);

  return (
    <>
      <Typography variant="h5">Liste des classes</Typography>
      <Typography>{errorMessage}</Typography>

      <Grid container direction="column">
        {courses.map((course) => (
          <Grid item key={course.name} onClick={() => handleCreateCourse(course)}>
            <Typography>{course.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
