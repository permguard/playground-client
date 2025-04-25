import { createAsyncThunk } from "@reduxjs/toolkit";

export const updatePrincipalState = createAsyncThunk(
  "principal/updatePrincipalStateStatus",
  async (arg: string) => {
    localStorage.setItem("principal:json_code", arg ?? null);
  }
);
