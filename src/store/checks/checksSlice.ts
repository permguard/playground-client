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
};

const checksSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.response = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initChecksState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updateChecksState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
    });

    builder.addCase(reset.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.checks;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.checks;
      state.selectedExample = action.meta.arg.name;
    });

    builder.addCase(check.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(check.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    });

    builder.addCase(check.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default checksSlice.reducer;
