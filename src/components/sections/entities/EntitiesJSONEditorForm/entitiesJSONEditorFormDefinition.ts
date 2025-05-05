import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { EntitiesJSONEditorFormPayload } from "./EntitiesJSONEditorFormPayload";

export const getEntitiesJSONEditorFormDefinition = (): IFormDefinition<
  FlattenKeys<EntitiesJSONEditorFormPayload>
> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Entities",
      id: "entities",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "code",
      name: "code",
      id: "code",
      height: "344px",
      language: "json",
      visible: true,
      className: "col-span-12",
    },
  ] as IFormDefinition<FlattenKeys<EntitiesJSONEditorFormPayload>>;

  return baseDefinition;
};
