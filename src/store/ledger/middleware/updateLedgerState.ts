import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateLedgerState = createAsyncThunk(
  "ledger/updateLedgerStateStatus",
  async (arg: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const storageKey =
      state.ledger.selectedTab === "json"
        ? "ledger:json_code"
        : "ledger:cedar_code";

    localStorage.setItem(storageKey, arg ?? null);
  }
);
