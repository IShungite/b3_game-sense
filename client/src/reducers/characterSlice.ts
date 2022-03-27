import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import characterService from "services/character.service";
import { getErrorMessage } from "utils";

export enum CharacterStatus {
  None,
  Loading,
  Finished,
  Error,
}

interface CharacterState {
  characters: ICharacter[];
  status: CharacterStatus;
  errorMessage: string;
}

const initialCharacter: CharacterState = {
  characters: [],
  status: CharacterStatus.None,
  errorMessage: "",
};

export const createCharacter = createAsyncThunk<ICharacter, CreateCharacterDto, { rejectValue: string }>(
  "character/create",
  async (formData: CreateCharacterDto, thunkAPI) => {
    try {
      const character = await characterService.createCharacter(formData);
      return character;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const characterSlice = createSlice({
  name: "character",
  initialState: initialCharacter,
  reducers: {
    clearState: (state) => {
      state.errorMessage = "";
      state.status = CharacterStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCharacter.pending, (state) => {
        state.status = CharacterStatus.Loading;
      })
      .addCase(createCharacter.fulfilled, (state, { payload }) => {
        state.status = CharacterStatus.Finished;
        state.characters = [...state.characters, payload];
      })
      .addCase(createCharacter.rejected, (state, { payload }) => {
        state.status = CharacterStatus.Error;

        state.errorMessage = payload || "";
      });
  },
});

export const { clearState } = characterSlice.actions;
export default characterSlice.reducer;
