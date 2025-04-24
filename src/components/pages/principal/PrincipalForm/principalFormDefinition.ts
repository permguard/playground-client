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
      type: "textfield",
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: "type",
      id: "type",
      label: "Type",
      labelId: "type",
      visible: true,
      disabled,
    },
    {
      type: "textfield",
      icon: "icon-park-outline:edit-name",
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
      icon: "icon-park-outline:edit-name",
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
