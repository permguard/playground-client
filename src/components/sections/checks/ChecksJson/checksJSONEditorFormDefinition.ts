import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksJSONEditorFormPayload } from "./ChecksJSONEditorFormPayload";

export const getChecksJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<ChecksJSONEditorFormPayload>
> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Request",
      className: "col-span-12 mt-11",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      id: "request",
      name: "request",
    },
    {
      type: "code",
      name: "code",
      id: "code",
      height: "400px",
      language: "json",
      visible: true,
      className: "col-span-12",
    },
  ] as IFormDefinition<FlattenKeys<ChecksJSONEditorFormPayload>>;

  return baseDefinition;
};
