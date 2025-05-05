import {
  IFormDefinition,
  FlattenKeys,
} from "@/components/shared/RHFFormBuilder/types";
import { ChecksRequestResponseFormPayload } from "./ChecksRequestResponseFormPayload";

export const getChecksRequestResponseFormDefinition = (): IFormDefinition<
  FlattenKeys<ChecksRequestResponseFormPayload>
> => {
  const baseDefinition = [
    {
      type: "code",
      name: "request",
      id: "request",
      height: "400px",
      language: "json",
      visible: true,
      disabled: true,
      label: "Request",
    },
    {
      type: "code",
      name: "response",
      id: "response",
      height: "400px",
      language: "json",
      visible: true,
      disabled: true,
      label: "Response",
    },
  ] as IFormDefinition<FlattenKeys<ChecksRequestResponseFormPayload>>;

  return baseDefinition;
};
