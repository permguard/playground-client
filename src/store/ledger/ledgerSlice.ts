import { createSlice } from "@reduxjs/toolkit";
import { ILedgerState } from "./types/ILedgerState";
import { initLedgerState } from "./middleware/initLedgerState";
import { updateLedgerState } from "./middleware/updateLedgerState";
import { reset } from "./middleware/reset";
import { setSelectedExample } from "./middleware/setSelectedExample";
import { EXAMPLES } from "@/utils/examples/examples";

const initialState: ILedgerState = {
  jsonCode: null,
  selectedExample: EXAMPLES[0].name,
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initLedgerState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updateLedgerState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
    });

    builder.addCase(reset.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.ledger ?? null;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.ledger;
      state.selectedExample = action.meta.arg.name;
    });
  },
});

export default ledgerSlice.reducer;
