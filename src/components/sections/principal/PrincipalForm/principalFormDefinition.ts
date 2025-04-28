import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { PrincipalFormPayload } from "./PrincipalFormPayload";

export const getPrincipalFormDefinition = ({
  disabled,
}: {
  disabled: boolean;
}): IFormDefinition<FlattenKeys<PrincipalFormPayload>> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Principal",
      id: "principal",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "select",
      icon: "material-symbols:category-outline",
      requiredFieldSymbol: true,
      name: "type",
      id: "type",
      label: "Type",
      labelId: "type",
      visible: true,
      disabled,
      options: [{ label: "user", value: "user" }],
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: "id",
      id: "id",
      label: "ID",
      labelId: "id",
      visible: true,
      disabled,
    },
    {
      type: "textfield",
      icon: "mdi:source-branch",
      requiredFieldSymbol: true,
      name: "source",
      id: "source",
      label: "Source",
      labelId: "source",
      visible: true,
      disabled,
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<PrincipalFormPayload>>;

  return baseDefinition;
};
