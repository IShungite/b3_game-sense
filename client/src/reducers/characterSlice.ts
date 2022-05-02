import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICharacter } from "models/characters/character";
import CreateCharacterDto from "models/characters/create-character.dto";
import UpdateCharacterDto from "models/characters/update-character.dto";
import { BuyProductDto } from "models/shops/buyProduct.dto";
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
  updateStatus: CharacterStatus;
  getAllStatus: CharacterStatus;
  itemStatus: CharacterStatus;
  createErrorMessage: string;
  updateErrorMessage: string;
  getAllErrorMessage: string;
  itemErrorMessage: string;
}

const initialCharacter: CharacterState = {
  characters: [],
  currentCharacter: undefined,
  createStatus: CharacterStatus.None,
  updateStatus: CharacterStatus.None,
  getAllStatus: CharacterStatus.None,
  itemStatus: CharacterStatus.None,
  createErrorMessage: "",
  updateErrorMessage: "",
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

export const updateCharacter = createAsyncThunk<
  ICharacter,
  { characterId: string; updateCharacterDto: UpdateCharacterDto },
  { rejectValue: string }
>("character/update", async ({ characterId, updateCharacterDto }, thunkAPI) => {
  try {
    return await characterService.updateCharacter(characterId, updateCharacterDto);
  } catch (err) {
    const error = err as Error | AxiosError;
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

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

export const buyProduct = createAsyncThunk<ICharacter, BuyProductDto, { rejectValue: string }>(
  "character/buyProduct",
  async (buyProductDto, thunkAPI) => {
    try {
      const currentCharacter = await characterService.buyProduct(buyProductDto);
      return currentCharacter;
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
      state.createErrorMessage = "";
      state.getAllErrorMessage = "";
      state.itemErrorMessage = "";
      state.updateErrorMessage = "";
      state.createStatus = CharacterStatus.None;
      state.updateStatus = CharacterStatus.None;
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

      .addCase(updateCharacter.pending, (state) => {
        state.updateStatus = CharacterStatus.Loading;
      })
      .addCase(updateCharacter.fulfilled, (state, { payload }) => {
        state.updateStatus = CharacterStatus.Finished;
        state.currentCharacter = payload;
      })
      .addCase(updateCharacter.rejected, (state, { payload }) => {
        state.updateStatus = CharacterStatus.Error;

        state.updateErrorMessage = payload ?? "";
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
      .addCase(buyProduct.pending, (state) => {
        state.itemStatus = CharacterStatus.Loading;
      })
      .addCase(buyProduct.fulfilled, (state, { payload }) => {
        state.currentCharacter = payload;
        state.itemStatus = CharacterStatus.Finished;
      })
      .addCase(buyProduct.rejected, (state, { payload }) => {
        state.itemStatus = CharacterStatus.Error;
        state.itemErrorMessage = payload ?? "";
      });
  },
});

export const { clearState, setCurrentCharacter, clearCharacters } = characterSlice.actions;
export default characterSlice.reducer;
