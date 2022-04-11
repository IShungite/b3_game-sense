import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import { ISubject } from "models/subjects/subject";
import subjectService from "services/subject.service";
import { getErrorMessage } from "utils";

export enum SubjectStatus {
  None,
  Loading,
  Finished,
  Error,
}

interface SubjectState {
  subjects: ISubject[];
  errorMessage?: string;
  status: SubjectStatus;
}

const initialSchool: SubjectState = {
  status: SubjectStatus.None,
  subjects: [],
};

export const getSubjects = createAsyncThunk<ISubject[], string, { rejectValue: string }>(
  "subject/getAll",
  async (courseId, thunkAPI) => {
    try {
      const subjects = await subjectService.getSubjects(courseId);
      return subjects;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createSubject = createAsyncThunk<ISubject, CreateSubjectDto, { rejectValue: string }>(
  "subject/create",
  async (createSubjectDto: CreateSubjectDto, thunkAPI) => {
    try {
      const subject = await subjectService.createSubject(createSubjectDto);
      return subject;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const courseSlice = createSlice({
  name: "subject",
  initialState: initialSchool,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.status = SubjectStatus.Loading;
      })
      .addCase(getSubjects.fulfilled, (state, { payload }) => {
        state.status = SubjectStatus.Finished;
        state.subjects = [...payload];
      })
      .addCase(getSubjects.rejected, (state, { payload }) => {
        state.status = SubjectStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createSubject.pending, (state) => {
        state.status = SubjectStatus.Loading;
      })
      .addCase(createSubject.fulfilled, (state, { payload }) => {
        state.status = SubjectStatus.Finished;
        state.subjects = [...state.subjects, payload];
      })
      .addCase(createSubject.rejected, (state, { payload }) => {
        state.status = SubjectStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState } = courseSlice.actions;
export default courseSlice.reducer;
