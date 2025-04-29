import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksJSONEditorFormPayload } from "./ChecksJSONEditorFormPayload";

export const getChecksJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<ChecksJSONEditorFormPayload>
> => {
  const baseDefinition: IFormDefinition<
    FlattenKeys<ChecksJSONEditorFormPayload>
  > = [
    {
      type: "code",
      name: "code",
      id: "code",
      height: "400px",
      language: "json",
      label: "Request",
      visible: true,
    },
    {
      type: "code",
      name: "response",
      id: "response",
      height: "400px",
      language: "json",
      label: "Response (read-only)",
      visible: true,
      disabled: true,
    },
  ];

  return baseDefinition;
};
