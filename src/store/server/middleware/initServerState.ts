import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initServerState = createAsyncThunk(
  "server/initServerStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("server:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find((el) => el.name === selectedExampleName)!.server;
    } else {
      jsonCode = EXAMPLES[0].server;
    }

    return { jsonCode };
  }
);
