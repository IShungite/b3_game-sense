import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginData, User } from "models/auth";
import authService from "services/auth.service";
import { getErrorMessage } from "utils";

interface AuthState {
  user: User | undefined;
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
const initalUser: User | undefined = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : undefined;
const initialAuthState: AuthState = { user: initalUser, status: AuthStatus.None, errorMessage: "" };

export const login = createAsyncThunk<User, LoginData, { rejectValue: string }>(
  "auth/login",
  async (formData: LoginData, thunkAPI) => {
    try {
      const user = await authService.login(formData);
      return user;
    } catch (err) {
      const errors = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(errors));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
