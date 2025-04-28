import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateRequestJSONState = createAsyncThunk(
  "checks/updateRequestJSONStateStatus",
  async (arg: string) => {
    localStorage.setItem("requestjson:json_code", arg ?? null);
  }
);
