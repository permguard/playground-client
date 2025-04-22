import { createAsyncThunk } from "@reduxjs/toolkit";

export const initLedgerState = createAsyncThunk(
  "ledger/initLedgerStateStatus",
  async () => {
    const cedarCode = localStorage.getItem("ledger:cedar_code");
    const jsonCode = localStorage.getItem("ledger:json_code");

    return { cedarCode, jsonCode };
  }
);
