import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { PrincipalJSONEditorFormPayload } from "./PrincipalJSONEditorFormPayload";

export const getPrincipalJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<PrincipalJSONEditorFormPayload>
> => {
  const baseDefinition: IFormDefinition<
    FlattenKeys<PrincipalJSONEditorFormPayload>
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
