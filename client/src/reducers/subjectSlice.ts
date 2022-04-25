import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  currentSubject?: ISubject;
  errorMessage?: string;
  status: SubjectStatus;
}

const initialSchool: SubjectState = {
  status: SubjectStatus.None,
  subjects: [],
};

export const getSubjects = createAsyncThunk<ISubject[], string, { rejectValue: string }>(
  "subject/getAll",
  async (promotionId, thunkAPI) => {
    try {
      return await subjectService.getSubjects(promotionId);
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getProfessorSubjects = createAsyncThunk<ISubject[], void, { rejectValue: string }>(
  "school/getProfessorSubjects",
  async (_, thunkAPI) => {
    try {
      return await subjectService.getProfessorSubjects();
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
      return await subjectService.createSubject(createSubjectDto);
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const promotionSlice = createSlice({
  name: "subject",
  initialState: initialSchool,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
    setCurrentSubject: (state, { payload }: PayloadAction<ISubject>) => {
      state.currentSubject = payload;
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
      })

      .addCase(getProfessorSubjects.pending, (state) => {
        state.status = SubjectStatus.Loading;
      })
      .addCase(getProfessorSubjects.fulfilled, (state, { payload }) => {
        state.status = SubjectStatus.Finished;
        state.subjects = [...payload];
      })
      .addCase(getProfessorSubjects.rejected, (state, { payload }) => {
        state.status = SubjectStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, setCurrentSubject } = promotionSlice.actions;
export default promotionSlice.reducer;
