import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initEvaluationsState = createAsyncThunk(
  "evaluations/initEvaluationsStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("evaluations:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find(
        (el) => el.name === selectedExampleName
      )!.evaluations;
    } else {
      jsonCode = EXAMPLES[0].evaluations;
    }

    return { jsonCode };
  }
);
