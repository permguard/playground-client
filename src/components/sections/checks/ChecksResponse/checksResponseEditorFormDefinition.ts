import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksResponseEditorFormPayload } from "./ChecksResponseEditorFormPayload";

export const getChecksResponseEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<ChecksResponseEditorFormPayload>
> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Response (read-only)",
      className: "col-span-12 mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
      id: "response_title",
      name: "response_title",
    },
    {
      type: "code",
      name: "response",
      id: "response",
      height: "400px",
      language: "json",
      visible: true,
      disabled: true,
      className: "col-span-12",
    },
  ] as IFormDefinition<FlattenKeys<ChecksResponseEditorFormPayload>>;

  return baseDefinition;
};
