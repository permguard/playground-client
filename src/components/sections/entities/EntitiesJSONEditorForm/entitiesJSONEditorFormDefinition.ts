import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { EntitiesJSONEditorFormPayload } from "./EntitiesJSONEditorFormPayload";

export const getEntitiesJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<EntitiesJSONEditorFormPayload>
> => {
  const baseDefinition: IFormDefinition<
    FlattenKeys<EntitiesJSONEditorFormPayload>
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
