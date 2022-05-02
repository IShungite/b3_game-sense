import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  currentCharacter: ICharacter | undefined;
  createStatus: CharacterStatus;
  getAllStatus: CharacterStatus;
  itemStatus: CharacterStatus;
  createErrorMessage: string;
  getAllErrorMessage: string;
  itemErrorMessage: string;
}

const initialCharacter: CharacterState = {
  characters: [],
  currentCharacter: undefined,
  createStatus: CharacterStatus.None,
  getAllStatus: CharacterStatus.None,
  itemStatus: CharacterStatus.None,
  createErrorMessage: "",
  getAllErrorMessage: "",
  itemErrorMessage: "",
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

export const getCharacters = createAsyncThunk<ICharacter[], void, { rejectValue: string }>(
  "character/getAll",
  async (_, thunkAPI) => {
    try {
      const characters = await characterService.getCharacters();
      return characters;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const buyItem = createAsyncThunk<
  ICharacter,
  { characterId: string; productId: string },
  { rejectValue: string }
>("character/buyItem", async ({ characterId, productId }, thunkAPI) => {
  try {
    const currentCharacter = await characterService.buyItem({ characterId, productId });
    return currentCharacter;
  } catch (err) {
    const error = err as Error | AxiosError;
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const characterSlice = createSlice({
  name: "character",
  initialState: initialCharacter,
  reducers: {
    clearState: (state) => {
      state.createErrorMessage = "";
      state.getAllErrorMessage = "";
      state.itemErrorMessage = "";
      state.createStatus = CharacterStatus.None;
      state.getAllStatus = CharacterStatus.None;
      state.itemStatus = CharacterStatus.None;
    },
    setCurrentCharacter: (state, { payload }: PayloadAction<ICharacter>) => {
      state.currentCharacter = payload;
    },
    clearCharacters: (state) => {
      state.characters = initialCharacter.characters;
      state.currentCharacter = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCharacter.pending, (state) => {
        state.createStatus = CharacterStatus.Loading;
      })
      .addCase(createCharacter.fulfilled, (state, { payload }) => {
        state.createStatus = CharacterStatus.Finished;
        state.characters = [...state.characters, payload];
      })
      .addCase(createCharacter.rejected, (state, { payload }) => {
        state.createStatus = CharacterStatus.Error;

        state.createErrorMessage = payload ?? "";
      })
      .addCase(getCharacters.pending, (state) => {
        state.getAllStatus = CharacterStatus.Loading;
      })
      .addCase(getCharacters.fulfilled, (state, { payload }) => {
        state.getAllStatus = CharacterStatus.Finished;
        state.characters = [...payload];
      })
      .addCase(getCharacters.rejected, (state, { payload }) => {
        state.getAllStatus = CharacterStatus.Error;

        state.getAllErrorMessage = payload ?? "";
      })
      .addCase(buyItem.pending, (state) => {
        state.itemStatus = CharacterStatus.Loading;
      })
      .addCase(buyItem.fulfilled, (state, { payload }) => {
        state.currentCharacter = payload;
        state.itemStatus = CharacterStatus.Finished;
      })
      .addCase(buyItem.rejected, (state, { payload }) => {
        state.itemStatus = CharacterStatus.Error;
        state.itemErrorMessage = payload ?? "";
      });
  },
});

export const { clearState, setCurrentCharacter, clearCharacters } = characterSlice.actions;
export default characterSlice.reducer;
