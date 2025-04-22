import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILedgerState } from "./types/ILedgerState";
import { initLedgerState } from "./middleware/initLedgerState";
import { updateLedgerState } from "./middleware/updateLedgerState";

const initialState: ILedgerState = {
  cedarCode: null,
  jsonCode: null,
  selectedTab: "cedar",
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<"cedar" | "json">) => {
      state.selectedTab = action.payload;
    },
  },

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
  },
});

export default ledgerSlice.reducer;
