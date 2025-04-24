import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { LedgerJSONEditorFormPayload } from "./LedgerJSONEditorFormPayload";

export const getLedgerJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<LedgerJSONEditorFormPayload>
> => {
  const baseDefinition: IFormDefinition<
    FlattenKeys<LedgerJSONEditorFormPayload>
  > = [
    {
      type: "code",
      name: "code",
      id: "code",
      height: "400px",
      language: "json",
      visible: true,
      className: "col-span-12",
    },
  ];

  return baseDefinition;
};
