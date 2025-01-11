import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { deliverer } from "@prisma/client";
import { RootState } from "./index";

// Async thunk to fetch deliverers
export const fetchDeliverers = createAsyncThunk(
  "deliverers/fetchDeliverers",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/deliverer`
    );
    const data = await response.json();
    return data;
  }
);

interface DelivererState {
  deliverers: deliverer[];
  loading: boolean;
  error: string | null;
}

const initialState: DelivererState = {
  deliverers: [],
  loading: false,
  error: null,
};

const delivererSlice = createSlice({
  name: "deliverers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliverers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDeliverers.fulfilled,
        (state, action: PayloadAction<deliverer[]>) => {
          state.deliverers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDeliverers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch deliverers";
      });
  },
});

// Selector to get all deliverers
export const selectAllDeliverers = (state: RootState) =>
  state.deliverers.deliverers;

export default delivererSlice.reducer;
