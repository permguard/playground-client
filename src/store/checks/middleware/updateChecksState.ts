import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateChecksState = createAsyncThunk(
  "checks/updateChecksStateStatus",
  async (arg: string) => {
    localStorage.setItem("checks:json_code", arg ?? null);
  }
);
