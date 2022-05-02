import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FetchStatus from "models/FetchStatus";
import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import { IPromotion } from "models/promotions/promotion";
import promotionService from "services/promotion.service";
import { getErrorMessage } from "utils";

interface PromotionState {
  promotions: IPromotion[];
  errorMessage?: string;
  status: FetchStatus;
  createStatus: FetchStatus;
  currentPromotion?: IPromotion;
}

const initialPromotion: PromotionState = {
  status: FetchStatus.None,
  createStatus: FetchStatus.None,
  promotions: [],
};

export const getPromotions = createAsyncThunk<IPromotion[], string, { rejectValue: string }>(
  "promotion/getAll",
  async (schoolId, thunkAPI) => {
    try {
      const promotions = await promotionService.getPromotions(schoolId);
      return promotions;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createPromotion = createAsyncThunk<IPromotion, CreatePromotionDto, { rejectValue: string }>(
  "promotion/create",
  async (formData: CreatePromotionDto, thunkAPI) => {
    try {
      const promotion = await promotionService.createPromotion(formData);
      return promotion;
    } catch (err) {
      const error = err as Error | AxiosError;
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState: initialPromotion,
  reducers: {
    clearState: (state) => {
      state.errorMessage = undefined;
      state.status = FetchStatus.None;
      state.createStatus = FetchStatus.None;
    },
    setCurrentPromotion: (state, { payload }: PayloadAction<IPromotion>) => {
      state.currentPromotion = payload;
    },
    clearPromotion: (state) => {
      state.currentPromotion = undefined;
      state.promotions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(getPromotions.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.Finished;
        state.promotions = [...payload];
      })
      .addCase(getPromotions.rejected, (state, { payload }) => {
        state.status = FetchStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createPromotion.pending, (state) => {
        state.createStatus = FetchStatus.Loading;
      })
      .addCase(createPromotion.fulfilled, (state, { payload }) => {
        state.createStatus = FetchStatus.Finished;
        state.promotions = [...state.promotions, payload];
      })
      .addCase(createPromotion.rejected, (state, { payload }) => {
        state.createStatus = FetchStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, clearPromotion, setCurrentPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
