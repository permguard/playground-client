import { CSSProperties, HTMLAttributes } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
import { AutocompleteOption } from "./RHFAutoComplete";

export interface IFormControl<InputNames extends string> {
  type:
    | "autocomplete"
    | "select"
    | "textfield"
    | "date"
    | "switch"
    | "typography"
    | "checkbox"
    | "button"
    | "code"
    | "options";
  id: InputNames;
  name: InputNames;
  visible: boolean;
  multiline?: boolean;
  rows?: number | string;
  mask?: string;
  icon?: string;
  label?: React.ReactNode;
  labelId?: string;
  multiple?: boolean;
  inputType?: string;
  inputVariant?: "standart" | "expanded";
  suffixText?: string;
  fullWidth?: boolean;
  textContent?: string;
  autoComplete?: boolean;
  autoHighlight?: boolean;
  ariaDescribedBy?: string;
  labelPlaceholder?: string;
  translateOptions?: boolean;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  style?: CSSProperties;
  inputProps?: Partial<HTMLAttributes<HTMLInputElement>>;
  options?: { value: string; label: string }[];
  autocompleteOptions?: AutocompleteOption[];
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  requiredFieldSymbol?: boolean | string;
  onClick?: () => void;
  buttonVariant?: "outline";
  buttonColor?: "primary" | "secondary" | "success" | "danger" | "warning";
  readonly?: boolean;
  className?: string;
  height?: string;
  language?: string;
  copy?: boolean;
  numericProps?: {
    min?: string;
    max?: string;
    step?: string;
  };
  additionalContent?: React.ReactNode;
}

export type IFormDefinition<InputNames extends string> =
  IFormControl<InputNames>[];

export type FlattenKeys<T> = T extends object
  ? NonNullable<
      {
        [K in keyof T]: K extends string
          ? T[K] extends object
            ? `${K & string}.${FlattenKeys<T[K]>}`
            : K & string
          : never;
      }[keyof T]
    >
  : "";
