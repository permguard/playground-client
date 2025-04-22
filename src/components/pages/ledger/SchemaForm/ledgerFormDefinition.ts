import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { LedgerFormPayload } from "./validation/LedgerFormPayload";

export const getLedgerFormDefinition = ({
  language,
}: {
  language: string;
}): IFormDefinition<FlattenKeys<LedgerFormPayload>> => {
  const baseDefinition: IFormDefinition<FlattenKeys<LedgerFormPayload>> = [
    {
      type: "code",
      name: "code",
      id: "code",
      height: "500px",
      language: language,
      visible: true,
      className: "col-span-12",
    },
  ];

  return baseDefinition;
};
