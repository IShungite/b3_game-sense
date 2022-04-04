import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  status: SchoolStatus;
  currentSchool?: ISchool;
}

const initialSchool: SchoolState = {
  status: SchoolStatus.None,
  schools: [],
};

export const getSchools = createAsyncThunk<ISchool[], void, { rejectValue: string }>(
  "school/getAll",
  async (_, thunkAPI) => {
    try {
      const schools = await schoolService.getSchools();
      return schools;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createSchool = createAsyncThunk<ISchool, CreateSchoolDto, { rejectValue: string }>(
  "school/create",
  async (formData: CreateSchoolDto, thunkAPI) => {
    try {
      const school = await schoolService.createSchool(formData);
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
    setCurrentSchool: (state, action: PayloadAction<ISchool>) => {
      state.currentSchool = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchools.pending, (state) => {
        state.status = SchoolStatus.Loading;
      })
      .addCase(getSchools.fulfilled, (state, { payload }) => {
        state.status = SchoolStatus.Finished;
        state.schools = [...payload];
      })
      .addCase(getSchools.rejected, (state, { payload }) => {
        state.status = SchoolStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createSchool.pending, (state) => {
        state.status = SchoolStatus.Loading;
      })
      .addCase(createSchool.fulfilled, (state, { payload }) => {
        state.status = SchoolStatus.Finished;
        state.schools = [...state.schools, payload];
      })
      .addCase(createSchool.rejected, (state, { payload }) => {
        state.status = SchoolStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, setCurrentSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
