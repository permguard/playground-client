import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateLedgerState = createAsyncThunk(
  "ledger/updateLedgerStateStatus",
  async (arg: string) => {
    localStorage.setItem("ledger:json_code", arg ?? null);
  }
);
