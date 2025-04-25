import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateServerState = createAsyncThunk(
  "server/updateServerStateStatus",
  async (arg: string) => {
    localStorage.setItem("server:json_code", arg ?? null);
  }
);
