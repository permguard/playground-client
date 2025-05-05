import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateEvaluationsState = createAsyncThunk(
  "evaluations/updateEvaluationsStateStatus",
  async (arg: string) => {
    localStorage.setItem("evaluations:json_code", arg ?? null);
  }
);
