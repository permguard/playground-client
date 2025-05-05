import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { EvaluationsJSONEditorFormPayload } from "./EvaluationsJSONEditorFormPayload";

export const getEvaluationsJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<EvaluationsJSONEditorFormPayload>
> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Request",
      className: "col-span-12",
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
  ] as IFormDefinition<FlattenKeys<EvaluationsJSONEditorFormPayload>>;

  return baseDefinition;
};
