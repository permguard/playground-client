import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initPrincipalState = createAsyncThunk(
  "principal/initPrincipalStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("principal:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find(
        (el) => el.name === selectedExampleName
      )!.principal;
    } else {
      jsonCode = EXAMPLES[0].principal;
    }

    return { jsonCode };
  }
);
