import { IRequestJSON, NestedNullable } from "@/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateRequestJSONState = createAsyncThunk(
  "checks/updateRequestJSONStateStatus",
  async (arg: string) => {
    localStorage.setItem("requestjson:json_code", arg ?? null);

    try {
      const request = JSON.parse(arg) as NestedNullable<IRequestJSON>;

      const ledgerJSON = request.authorization_model;

      // Ledger
      const ledgerPayload = JSON.stringify(
        {
          zone_id: request.authorization_model?.zone_id,
          policy_store: {
            kind: request.authorization_model?.policy_store?.kind,
            id: request.authorization_model?.policy_store?.id,
          },
        },
        null,
        2
      );
    } catch {}
  }
);
