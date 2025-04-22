import { RootState } from "@/store";
import { SchemaToJsonAnswer } from "@cedar-policy/cedar-wasm";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const switchMode = createAsyncThunk(
  "ledger/switchModeStatus",
  async (_arg: undefined, thunkApi) => {
    const cedar = await import("@cedar-policy/cedar-wasm");

    const state = thunkApi.getState() as RootState;

    const cedarCode = state.ledger.cedarCode;

    let result: SchemaToJsonAnswer;

    if (state.ledger.selectedTab === "json") {
    } else {
      result = cedar.schemaToJson(cedarCode!);

      console.log(result);

      if (result.type === "failure") {
        thunkApi.rejectWithValue(result.errors);
        return null;
      }

      const tab = "json";
      const code = JSON.stringify(result.json, null, 2);

      return { tab, code };
    }
  }
);
