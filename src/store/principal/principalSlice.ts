import { createSlice } from "@reduxjs/toolkit";
import { IPrincipalState } from "./types/IPrincipalState";
import { initPrincipalState } from "./middleware/initPrincipalState";
import { updatePrincipalState } from "./middleware/updatePrincipalState";
import { EXAMPLES } from "@/utils/examples/examples";
import { reset } from "../ledger/middleware/reset";
import { setSelectedExample } from "../ledger/middleware/setSelectedExample";

const initialState: IPrincipalState = {
  selectedExample: EXAMPLES[0].name,
};

const principalSlice = createSlice({
  name: "principal",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initPrincipalState.fulfilled, (state, action) => {
      state.jsonCode = action.payload.jsonCode;
    });

    builder.addCase(updatePrincipalState.fulfilled, (state, action) => {
      state.jsonCode = action.meta.arg;
    });

    builder.addCase(reset.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.principal;
    });

    builder.addCase(setSelectedExample.fulfilled, (state, action) => {
      state.jsonCode = action.payload?.principal;
      state.selectedExample = action.meta.arg.name;
    });
  },
});

export default principalSlice.reducer;
