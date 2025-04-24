import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateEntitiesState = createAsyncThunk(
  "entities/updateEntitiesStateStatus",
  async (arg: string) => {
    localStorage.setItem("entities:json_code", arg ?? null);
  }
);
