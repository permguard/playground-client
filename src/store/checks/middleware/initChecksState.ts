import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initChecksState = createAsyncThunk(
  "checks/initChecksStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("checks:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find((el) => el.name === selectedExampleName)!.checks;
    } else {
      jsonCode = EXAMPLES[0].checks;
    }

    return { jsonCode };
  }
);
