import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ICheckResponse } from "../types/api/ICheckResponse";

export const check = createAsyncThunk(
  "evaluations/checkStateStatus",
  async (arg: undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;

      const authorizationModel = JSON.parse(state.ledger.jsonCode!);
      const principal = JSON.parse(state.principal.jsonCode!);
      const entities = JSON.parse(state.entities.jsonCode!);
      const evaluations = JSON.parse(state.evaluations.jsonCode!);
      const server = JSON.parse(state.server.jsonCode!);

      if (!evaluations?.evaluations) {
        evaluations.evaluations = [];
      }

      const payload = {
        authorization_model: {
          ...authorizationModel,
          principal,
          entities,
        },
        ...evaluations,
        ...server,
      };

      const response = await axios.post<ICheckResponse>(
        "/api/permguard",
        payload
      );

      return response.data;
    } catch (err) {
      toast.error("Something went wrong when fetching the data");

      return thunkAPI.rejectWithValue((err as AxiosError).response?.data);
    }
  }
);
