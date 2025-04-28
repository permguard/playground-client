import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ICheckResponse } from "../types/api/ICheckResponse";

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

      checks.subject.properties = JSON.parse(checks.subject.properties);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checks.evaluations.forEach((evaluation) => {
        evaluation.resource.properties = JSON.parse(
          evaluation.resource.properties
        );
        evaluation.action.properties = JSON.parse(evaluation.action.properties);
      });

      const payload = {
        authorization_model: {
          ...authorizationModel,
          principal,
          entities,
        },
        ...checks,
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
