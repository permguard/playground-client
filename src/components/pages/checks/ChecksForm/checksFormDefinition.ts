import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksFormPayload } from "./ChecksFormPayload";

export const getChecksFormDefinition = ({
  disabled,
}: {
  disabled: boolean;
}): IFormDefinition<FlattenKeys<ChecksFormPayload>> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Checks",
      id: "checks",
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
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<ChecksFormPayload>>;

  return baseDefinition;
};
