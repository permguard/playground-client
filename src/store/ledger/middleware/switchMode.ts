import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const switchMode = createAsyncThunk(
  "ledger/switchModeStatus",
  async (_arg: undefined, thunkApi) => {
    const cedar = await import("@cedar-policy/cedar-wasm");

    const state = thunkApi.getState() as RootState;

    const cedarCode = state.ledger.cedarCode;
    const jsonCode = state.ledger.jsonCode;

    if (state.ledger.selectedTab === "json") {
      const result = cedar.schemaToText(JSON.parse(jsonCode!));
      console.log(result);

      if (result.type === "failure") {
        thunkApi.rejectWithValue(result.errors);
        return null;
      }

      const tab = "cedar";
      const code = result.text;

      return { tab, code };
    } else {
      const result = cedar.schemaToJson(cedarCode!);

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
