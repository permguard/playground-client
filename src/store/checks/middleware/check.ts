import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

export const check = createAsyncThunk(
  "checks/checkStateStatus",
  async (arg: undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;

      const authorizationModel = JSON.parse(state.ledger.jsonCode!);
      const principal = JSON.parse(state.principal.jsonCode!);
      const entities = JSON.parse(state.entities.jsonCode!);
      const checks = JSON.parse(state.checks.jsonCode!);
      const server = JSON.parse(state.server.jsonCode!);

      const payload = {
        authorization_model: {
          ...authorizationModel,
          principal,
          entities,
        },
        ...checks,
        ...server,
      };

      console.log("Payload to Permguard:", payload);

      const response = await axios.post("/api/permguard", payload);

      console.log("Response from Permguard:", response);
    } catch (err) {
      toast.error("Something went wrong when fetching the data");

      return thunkAPI.rejectWithValue((err as AxiosError).response?.data);
    }
  }
);
