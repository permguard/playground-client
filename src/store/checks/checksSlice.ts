import { createSlice } from "@reduxjs/toolkit";
import { IChecksState } from "./types/IChecksState";
import { initChecksState } from "./middleware/initChecksState";
import { updateChecksState } from "./middleware/updateChecksState";
import { EXAMPLES } from "@/utils/examples/examples";
import { reset } from "../ledger/middleware/reset";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";
import { check } from "./middleware/check";

const initialState: IChecksState = {
  selectedExample: EXAMPLES[0].name,
  isLoading: false,
  isModalOpen: false,
  isInitial: true,
};

const checksSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initChecksState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
      state.isInitial = true;
    });

    builder.addCase(updateChecksState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
      state.isInitial = false;
    });

    builder.addCase(reset.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.checks;
      state.isInitial = true;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.checks;
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

export const { closeModal } = checksSlice.actions;

export default checksSlice.reducer;
