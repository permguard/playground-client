import { createSlice } from "@reduxjs/toolkit";
import { IChecksState } from "./types/IChecksState";
import { initChecksState } from "./middleware/initChecksState";
import { updateChecksState } from "./middleware/updateChecksState";
import { EXAMPLES } from "@/utils/examples/examples";
import { reset } from "../ledger/middleware/reset";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";

const initialState: IChecksState = {
  selectedExample: EXAMPLES[0].name,
};

const checksSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {},

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
  },
});

export default checksSlice.reducer;
