import { createAsyncThunk } from "@reduxjs/toolkit";

export const initLedgerState = createAsyncThunk(
  "ledger/initLedgerStateStatus",
  async () => {
    const jsonCode = localStorage.getItem("ledger:json_code");

    return { jsonCode };
  }
);
