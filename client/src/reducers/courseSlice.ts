import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICourse } from "models/course/course";
import { CreateCourseDto } from "models/course/create-course.dto";
import courseService from "services/course.service";
import { getErrorMessage } from "utils";

export enum CourseStatus {
  None,
  Loading,
  Finished,
  Error,
}

interface CourseState {
  courses: ICourse[];
  errorMessage?: string;
  status: CourseStatus;
}

const initialSchool: CourseState = {
  status: CourseStatus.None,
  courses: [],
};

export const getCourses = createAsyncThunk<ICourse[], string, { rejectValue: string }>(
  "classRoom/getAll",
  async (schoolId, thunkAPI) => {
    try {
      const courses = await courseService.getCourses(schoolId);
      return courses;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createCourse = createAsyncThunk<ICourse, CreateCourseDto, { rejectValue: string }>(
  "classRoom/create",
  async (formData: CreateCourseDto, thunkAPI) => {
    try {
      const course = await courseService.createCourse(formData);
      return course;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const courseSlice = createSlice({
  name: "character",
  initialState: initialSchool,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = CourseStatus.Loading;
      })
      .addCase(getCourses.fulfilled, (state, { payload }) => {
        state.status = CourseStatus.Finished;
        state.courses = [...payload];
      })
      .addCase(getCourses.rejected, (state, { payload }) => {
        state.status = CourseStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.status = CourseStatus.Loading;
      })
      .addCase(createCourse.fulfilled, (state, { payload }) => {
        state.status = CourseStatus.Finished;
        state.courses = [...state.courses, payload];
      })
      .addCase(createCourse.rejected, (state, { payload }) => {
        state.status = CourseStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState } = courseSlice.actions;
export default courseSlice.reducer;
