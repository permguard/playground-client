import {
  FlattenKeys,
  IFormDefinition,
} from "@/components/shared/RHFFormBuilder/types";
import { LedgerFormPayload } from "./LedgerFormPayload";

export const getLedgerFormDefinition = (): IFormDefinition<
  FlattenKeys<LedgerFormPayload>
> => {
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
      icon: "icon-park-outline:edit-name",
      requiredFieldSymbol: true,
      name: "zone_id",
      id: "zone_id",
      label: "Zone ID",
      labelId: "zone_id",
      visible: true,
    },
    {
      type: "typography",
      label: "Policy store",
      id: "policy_store",
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
      name: "kind",
      id: "kind",
      label: "Kind",
      labelId: "kind",
      visible: true,
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
    },
  ].filter(Boolean) as IFormDefinition<FlattenKeys<LedgerFormPayload>>;

  return baseDefinition;
};
