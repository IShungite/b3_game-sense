import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IAnswer } from "models/answers/answer";
import { CreateAnswerDto } from "models/answers/create-answer.dto";
import FetchStatus from "models/FetchStatus";
import answerService from "services/answer.service";
import { getErrorMessage } from "utils";

interface AnswerState {
  errorMessage?: string;
  status: FetchStatus;
}

const initialAnswer: AnswerState = {
  status: FetchStatus.None,
};

export const createAnswer = createAsyncThunk<IAnswer, CreateAnswerDto, { rejectValue: string }>(
  "answer/create",
  async (createAnswerDto, thunkAPI) => {
    try {
      return await answerService.createAnswer(createAnswerDto);
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const answerSlice = createSlice({
  name: "answer",
  initialState: initialAnswer,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(createAnswer.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;
      })
      .addCase(createAnswer.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState } = answerSlice.actions;
export default answerSlice.reducer;
