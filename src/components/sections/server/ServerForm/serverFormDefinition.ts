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
      type: "typography",
      label: "Server",
      id: "server",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "textfield",
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: "url",
      id: "url",
      label: "Host",
      labelId: "url",
      visible: true,
      disabled,
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
      inputType: "number",
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<ServerFormPayload>>;

  return baseDefinition;
};
