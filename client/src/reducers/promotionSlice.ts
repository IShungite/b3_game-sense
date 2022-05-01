import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import { IPromotion } from "models/promotions/promotion";
import promotionService from "services/promotion.service";
import { getErrorMessage } from "utils";

export enum PromotionStatus {
  None,
  Loading,
  Finished,
  Error,
}

interface PromotionState {
  promotions: IPromotion[];
  errorMessage?: string;
  status: PromotionStatus;
  currentPromotion?: IPromotion;
}

const initialPromotion: PromotionState = {
  status: PromotionStatus.None,
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
    },
    setCurrentPromotion: (state, { payload }: PayloadAction<IPromotion>) => {
      state.currentPromotion = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.status = PromotionStatus.Loading;
      })
      .addCase(getPromotions.fulfilled, (state, { payload }) => {
        state.status = PromotionStatus.Finished;
        state.promotions = [...payload];
      })
      .addCase(getPromotions.rejected, (state, { payload }) => {
        state.status = PromotionStatus.Error;

        /* Used to display an error message to the user. */
        state.errorMessage = payload;
      })
      .addCase(createPromotion.pending, (state) => {
        state.status = PromotionStatus.Loading;
      })
      .addCase(createPromotion.fulfilled, (state, { payload }) => {
        state.status = PromotionStatus.Finished;
        state.promotions = [...state.promotions, payload];
      })
      .addCase(createPromotion.rejected, (state, { payload }) => {
        state.status = PromotionStatus.Error;

        state.errorMessage = payload;
      });
  },
});

export const { clearState, setCurrentPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
