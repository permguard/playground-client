import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { ServerFormPayload } from "./ServerFormPayload";

export const getServerFormDefinition = ({
  disabled,
}: {
  disabled: boolean;
}): IFormDefinition<FlattenKeys<ServerFormPayload>> => {
  const baseDefinition = [
    {
      type: "textfield",
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: "url",
      id: "url",
      label: "URL",
      labelId: "url",
      visible: true,
      disabled,
      className: "col-span-8",
    },
    {
      type: "textfield",
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: "port",
      id: "port",
      label: "Port",
      labelId: "port",
      visible: true,
      disabled,
      className: "col-span-4",
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<ServerFormPayload>>;

  return baseDefinition;
};
