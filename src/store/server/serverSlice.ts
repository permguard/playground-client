import { createSlice } from "@reduxjs/toolkit";
import { IServerState } from "./types/IServerState";
import { initServerState } from "./middleware/initServerState";
import { updateServerState } from "./middleware/updateServerState";
import { EXAMPLES } from "@/utils/examples/examples";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";

const initialState: IServerState = {
  selectedExample: EXAMPLES[0].name,
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initServerState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updateServerState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.server;
      state.selectedExample = action.meta.arg.name;
    });
  },
});

export default serverSlice.reducer;
