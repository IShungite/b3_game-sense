import { Button, Grid, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { ICourse } from "models/courses/course";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, setCurrentCourse } from "reducers/courseSlice";

export default function CoursesGrid() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courses, errorMessage } = useAppSelector((state) => state.course);
  const { currentSchool } = useAppSelector((state) => state.school);

  const handleClickCourse = (course: ICourse) => {
    dispatch(setCurrentCourse(course));
    navigate(RouteUrls.Course);
  };

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
          <Grid item key={course.name}>
            <Button
              onClick={() => {
                handleClickCourse(course);
              }}
            >
              {course.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
