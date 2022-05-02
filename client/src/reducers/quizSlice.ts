import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FetchStatus from "models/FetchStatus";
import { CreateQuizDto } from "models/quizzes/create-quiz.dto";
import { IQuiz, IQuizWithoutCorrectAnswer } from "models/quizzes/quiz";
import quizService from "services/quiz.service";
import { getErrorMessage } from "utils";

interface QuizState {
  errorMessage?: string;
  status: FetchStatus;
  createStatus: FetchStatus;
  quizzes: IQuiz[];
  quizzesWithoutCorrectAnswers: { quizDone: IQuizWithoutCorrectAnswer[]; quizToDo: IQuizWithoutCorrectAnswer[] };
}

const initialQuiz: QuizState = {
  status: FetchStatus.None,
  createStatus: FetchStatus.None,
  quizzes: [],
  quizzesWithoutCorrectAnswers: { quizDone: [], quizToDo: [] },
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

export const getCharacterQuizzes = createAsyncThunk<
  { quizDone: IQuizWithoutCorrectAnswer[]; quizToDo: IQuizWithoutCorrectAnswer[] },
  string,
  { rejectValue: string }
>("quiz/getCharacterQuizzes", async (characterId, thunkAPI) => {
  try {
    return await quizService.getCharacterQuizzes(characterId);
  } catch (err) {
    const error = err as Error | AxiosError;
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuiz,
  reducers: {
    clearState: (state) => {
      state.status = FetchStatus.None;
      state.createStatus = FetchStatus.None;
      state.errorMessage = undefined;
    },
    clearQuizzes: (state) => {
      state.quizzes = [];
      state.quizzesWithoutCorrectAnswers = { quizDone: [], quizToDo: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.createStatus = FetchStatus.Loading;
      })
      .addCase(createQuiz.fulfilled, (state, { payload }) => {
        state.createStatus = FetchStatus.Finished;
      })
      .addCase(createQuiz.rejected, (state, { payload }) => {
        state.createStatus = FetchStatus.Error;

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
      })
      .addCase(getCharacterQuizzes.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(getCharacterQuizzes.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;

        state.quizzesWithoutCorrectAnswers = payload;
      })
      .addCase(getCharacterQuizzes.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, clearQuizzes } = quizSlice.actions;
export default quizSlice.reducer;
