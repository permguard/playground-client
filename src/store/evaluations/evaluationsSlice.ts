import { createSlice } from "@reduxjs/toolkit";
import { IEvaluationsState as IEvaluationsState } from "./types/IEvaluationsState";
import { initEvaluationsState } from "./middleware/initEvaluationsState";
import { updateEvaluationsState } from "./middleware/updateEvaluationsState";
import { EXAMPLES } from "@/utils/examples/examples";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";
import { check } from "./middleware/check";

const initialState: IEvaluationsState = {
  selectedExample: EXAMPLES[0].name,
  isLoading: false,
  isModalOpen: false,
  isInitial: true,
  response: null,
};

const evaluationsSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initEvaluationsState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
      state.response = null;
      state.isInitial = true;
    });

    builder.addCase(updateEvaluationsState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
      state.isInitial = false;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.evaluations;
      state.selectedExample = action.meta.arg.name;
      state.isInitial = true;
    });

    builder.addCase(check.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(check.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
      state.isModalOpen = true;
    });

    builder.addCase(check.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { closeModal } = evaluationsSlice.actions;

export default evaluationsSlice.reducer;
