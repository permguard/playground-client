import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const setSelectedExample = createAsyncThunk(
  "ledger/setSelectedExampleStatus",
  async (arg: { name: string }) => {
    localStorage.setItem("selected_example_name", arg.name);

    const selectedExample = EXAMPLES.find((el) => el.name === arg.name)!;

    return selectedExample;
  }
);
