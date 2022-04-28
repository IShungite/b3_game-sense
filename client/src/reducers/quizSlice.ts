import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FetchStatus from "models/FetchStatus";
import { CreateQuizDto } from "models/quizs/create-quiz.dto";
import { IQuiz } from "models/quizs/quiz";
import quizService from "services/quiz.service";
import { getErrorMessage } from "utils";

interface QuizState {
  errorMessage?: string;
  status: FetchStatus;
  quizzes: IQuiz[];
}

const initialQuiz: QuizState = {
  status: FetchStatus.None,
  quizzes: [],
};

export const createQuiz = createAsyncThunk<IQuiz, CreateQuizDto, { rejectValue: string }>(
  "quiz/create",
  async (createQuizDto, thunkAPI) => {
    try {
      return await quizService.createQuiz(createQuizDto);
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getProfessorQuizzes = createAsyncThunk<IQuiz[], void, { rejectValue: string }>(
  "quiz/getProfessorQuizzes",
  async (_, thunkAPI) => {
    try {
      return await quizService.getProfessorQuizzes();
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuiz,
  reducers: {
    clearState: (state) => {
      state.status = FetchStatus.None;
      state.errorMessage = undefined;
    },
    clearQuizzes: (state) => {
      state.quizzes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(createQuiz.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;
      })
      .addCase(createQuiz.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        state.errorMessage = payload;
      })
      .addCase(getProfessorQuizzes.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(getProfessorQuizzes.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;

        state.quizzes = payload;
      })
      .addCase(getProfessorQuizzes.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, clearQuizzes } = quizSlice.actions;
export default quizSlice.reducer;
