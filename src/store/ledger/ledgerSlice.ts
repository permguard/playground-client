import { createSlice } from "@reduxjs/toolkit";
import { ILedgerState } from "./types/ILedgerState";
import { initLedgerState } from "./middleware/initLedgerState";
import { updateLedgerState } from "./middleware/updateLedgerState";

const initialState: ILedgerState = {
  jsonCode: null,
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
  },
});

export default ledgerSlice.reducer;
