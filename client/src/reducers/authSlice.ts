import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IUser, LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import authService from "services/auth.service";
import { getErrorMessage } from "utils";

interface AuthState {
  user: IUser | undefined;
  status: AuthStatus;
  errorMessage: string;
}

export enum AuthStatus {
  None,
  Loading,
  Finished,
  Error,
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const initalUser: IUser | undefined = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : undefined;
const initialAuthState: AuthState = { user: initalUser, status: AuthStatus.None, errorMessage: "" };

export const login = createAsyncThunk<IUser, LoginCredentialsDto, { rejectValue: string }>(
  "auth/login",
  async (formData: LoginCredentialsDto, thunkAPI) => {
    try {
      const user = await authService.login(formData);
      return user;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const register = createAsyncThunk<undefined, RegisterCredentialsDto, { rejectValue: string }>(
  "auth/register",
  async (formData: RegisterCredentialsDto, thunkAPI) => {
    try {
      await authService.register(formData);
      return undefined;
    } catch (err) {
      const error = err as Error | AxiosError;

      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state, { payload }: PayloadAction<undefined>) => {
      state.user = payload;
    },
    clearState: (state) => {
      state.errorMessage = "";
      state.status = AuthStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = AuthStatus.Loading;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = AuthStatus.Finished;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = AuthStatus.Error;

        state.errorMessage = payload || "";
      })
      .addCase(register.pending, (state) => {
        state.status = AuthStatus.Loading;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = AuthStatus.Finished;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = AuthStatus.Error;

        state.errorMessage = payload || "";
      });
  },
});

export const { logout, clearState } = authSlice.actions;
export default authSlice.reducer;
