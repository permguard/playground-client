import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const reset = createAsyncThunk("ledger/resetStatus", async () => {
  localStorage.removeItem("ledger:json_code");

  const selectedExampleName =
    localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

  const selectedExample = EXAMPLES.find(
    (el) => el.name === selectedExampleName
  );

  return selectedExample;
});
