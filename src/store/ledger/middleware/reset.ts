import { createAsyncThunk } from "@reduxjs/toolkit";
import { initLedgerState } from "./initLedgerState";
import { initEvaluationsState } from "@/store/evaluations/middleware/initEvaluationsState";
import { initEntitiesState } from "@/store/entities/middleware/initEntitiesState";
import { initPrincipalState } from "@/store/principal/middleware/initPrincipalState";
import { initServerState } from "@/store/server/middleware/initServerState";

export const reset = createAsyncThunk(
  "ledger/resetStatus",
  async (arg: undefined, thunkApi) => {
    localStorage.removeItem("ledger:json_code");
    localStorage.removeItem("evaluations:json_code");
    localStorage.removeItem("entities:json_code");
    localStorage.removeItem("principal:json_code");
    localStorage.removeItem("server:json_code");

    thunkApi.dispatch(initLedgerState());
    thunkApi.dispatch(initEvaluationsState());
    thunkApi.dispatch(initEntitiesState());
    thunkApi.dispatch(initPrincipalState());
    thunkApi.dispatch(initServerState());
  }
);
