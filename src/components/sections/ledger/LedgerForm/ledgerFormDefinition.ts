import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { LedgerFormPayload } from "./LedgerFormPayload";

export const getLedgerFormDefinition = ({
  disabled,
}: {
  disabled: boolean;
}): IFormDefinition<FlattenKeys<LedgerFormPayload>> => {
  const baseDefinition = [
    {
      type: "typography",
      label: "Zone",
      id: "zone",
      className: "col-span-12",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: "zone_id",
      id: "zone_id",
      label: "Zone ID",
      labelId: "zone_id",
      visible: true,
      inputType: "number",
      disabled,
      numericProps: {
        max: 999999999999999,
      },
    },
    {
      type: "typography",
      label: "Policy store",
      id: "policy_store",
      className: "col-span-12 mt-4",
      inputProps: {
        className: "text-md font-medium text-white",
      },
      visible: true,
    },
    {
      type: "textfield",
      icon: "mdi:label-outline",
      requiredFieldSymbol: true,
      name: "policy_store_kind",
      id: "policy_store_kind",
      label: "Kind",
      labelId: "policy_store_kind",
      visible: true,
      disabled,
    },
    {
      type: "textfield",
      icon: "mdi:identifier",
      requiredFieldSymbol: true,
      name: "policy_store_id",
      id: "policy_store_id",
      label: "ID",
      labelId: "policy_store_id",
      visible: true,
      disabled,
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<LedgerFormPayload>>;

  return baseDefinition;
};
