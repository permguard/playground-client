import { createSlice } from "@reduxjs/toolkit";
import { ILedgerState } from "./types/ILedgerState";
import { initLedgerState } from "./middleware/initLedgerState";
import { updateLedgerState } from "./middleware/updateLedgerState";
import { switchMode } from "./middleware/switchMode";

const initialState: ILedgerState = {
  cedarCode: null,
  jsonCode: null,
  selectedTab: "cedar",
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initLedgerState.fulfilled, (state, action) => {
      state.cedarCode = action.payload.cedarCode;
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updateLedgerState.fulfilled, (state, action) => {
      if (state.selectedTab === "json") {
        state.jsonCode = action.meta.arg;
      } else {
        state.cedarCode = action.meta.arg;
      }
    });

    builder.addCase(switchMode.fulfilled, (state, action) => {
      if (action.payload) {
        state.selectedTab = action.payload.tab as "cedar" | "json";

        if (state.selectedTab === "json") {
          state.jsonCode = action.payload.code;
        } else {
          state.cedarCode = action.payload.code;
        }
      }
    });
  },
});

export default ledgerSlice.reducer;
