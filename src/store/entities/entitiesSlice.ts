import { createSlice } from "@reduxjs/toolkit";
import { IEntitiesState } from "./types/IEntitiesState";
import { initEntitiesState } from "./middleware/initEntitiesState";
import { updateEntitiesState } from "./middleware/updateEntitiesState";
import { EXAMPLES } from "@/utils/examples/examples";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";

const initialState: IEntitiesState = {
  selectedExample: EXAMPLES[0].name,
};

const entitieslice = createSlice({
  name: "entities",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initEntitiesState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updateEntitiesState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.entities;
      state.selectedExample = action.meta.arg.name;
    });
  },
});

export default entitieslice.reducer;
