import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FetchStatus from "models/FetchStatus";
import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import { ISubject } from "models/subjects/subject";
import subjectService from "services/subject.service";
import { getErrorMessage } from "utils";

interface SubjectState {
  subjects: ISubject[];
  currentSubject?: ISubject;
  errorMessage?: string;
  status: FetchStatus;
  createStatus: FetchStatus;
}

const initialSchool: SubjectState = {
  status: FetchStatus.None,
  createStatus: FetchStatus.None,
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
      state.createStatus = FetchStatus.None;
    },
    setCurrentSubject: (state, { payload }: PayloadAction<ISubject>) => {
      state.currentSubject = payload;
    },
    clearSubject: (state) => {
      state.currentSubject = undefined;
      state.subjects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(getSubjects.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;
        state.subjects = [...payload];
      })
      .addCase(getSubjects.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createSubject.pending, (state) => {
        state.createStatus = FetchStatus.Loading;
      })
      .addCase(createSubject.fulfilled, (state, { payload }) => {
        state.createStatus = FetchStatus.Finished;
        state.subjects = [...state.subjects, payload];
      })
      .addCase(createSubject.rejected, (state, { payload }) => {
        state.createStatus = FetchStatus.Error;

        state.errorMessage = payload;
      })

      .addCase(getProfessorSubjects.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(getProfessorSubjects.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;
        state.subjects = [...payload];
      })
      .addCase(getProfessorSubjects.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, clearSubject, setCurrentSubject } = promotionSlice.actions;
export default promotionSlice.reducer;
