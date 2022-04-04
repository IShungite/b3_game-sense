import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateSchoolDto } from "models/schools/create-school.dto";
import { ISchool } from "models/schools/school";
import schoolService from "services/school.service";
import { getErrorMessage } from "utils";

export enum SchoolStatus {
  None,
  Loading,
  Finished,
  Error,
}

interface SchoolState {
  schools: ISchool[];
  errorMessage?: string;
  createStatus: SchoolStatus;
}

const initialSchool: SchoolState = {
  createStatus: SchoolStatus.None,
  schools: [],
};

export const createSchool = createAsyncThunk<ISchool, CreateSchoolDto, { rejectValue: string }>(
  "school/create",
  async (formData: CreateSchoolDto, thunkAPI) => {
    try {
      const school = await schoolService.createSchool(formData);

      console.log({ school });

      return school;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const schoolSlice = createSlice({
  name: "character",
  initialState: initialSchool,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchool.pending, (state) => {
        state.createStatus = SchoolStatus.Loading;
      })
      .addCase(createSchool.fulfilled, (state, { payload }) => {
        state.createStatus = SchoolStatus.Finished;
        state.schools = [...state.schools, payload];
      })
      .addCase(createSchool.rejected, (state, { payload }) => {
        state.createStatus = SchoolStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState } = schoolSlice.actions;
export default schoolSlice.reducer;
