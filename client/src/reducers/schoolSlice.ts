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

export const getDirectorSchools = createAsyncThunk<ISchool[], void, { rejectValue: string }>(
  "school/getDirectorSchools",
  async (_, thunkAPI) => {
    try {
      const schools = await schoolService.getDirectorSchools();
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
  name: "school",
  initialState: initialSchool,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
    },
    setCurrentSchool: (state, action: PayloadAction<ISchool>) => {
      state.currentSchool = action.payload;
    },
    clearSchool: (state) => {
      state.currentSchool = undefined;
      state.schools = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectorSchools.pending, (state) => {
        state.status = SchoolStatus.Loading;
      })
      .addCase(getDirectorSchools.fulfilled, (state, { payload }) => {
        state.status = SchoolStatus.Finished;
        state.schools = [...payload];
      })
      .addCase(getDirectorSchools.rejected, (state, { payload }) => {
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

export const { clearState, clearSchool, setCurrentSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
