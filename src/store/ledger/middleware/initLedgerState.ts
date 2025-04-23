import { EXAMPLES } from "@/utils/examples/examples";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initLedgerState = createAsyncThunk(
  "ledger/initLedgerStateStatus",
  async () => {
    let jsonCode = localStorage.getItem("ledger:json_code");

    if (jsonCode) {
      return { jsonCode };
    }

    const selectedExampleName =
      localStorage.getItem("selected_example_name") || EXAMPLES[0].name;

    if (selectedExampleName) {
      jsonCode = EXAMPLES.find((el) => el.name === selectedExampleName)!.ledger;
    } else {
      jsonCode = EXAMPLES[0].ledger;
    }

    return { jsonCode };
  }
);
