import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initEntitiesState = createAsyncThunk(
  "entities/initEntitiesStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("entities:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find(
        (el) => el.name === selectedExampleName
      )!.entities;
    } else {
      jsonCode = EXAMPLES[0].entities;
    }

    return { jsonCode };
  }
);
