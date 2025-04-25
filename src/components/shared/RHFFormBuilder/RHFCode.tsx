import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { RHFFormHelperError } from "./RHFFormHelperError";
import { Editor } from "@monaco-editor/react";
import { getFormErrorByPath } from "./utils";

interface IRHFCodeProps<T extends FieldValues> {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  fullWidth?: boolean;
  control: Control<T>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
  language: string;
  height?: string;
  label?: React.ReactNode;
  requiredFieldSymbol?: boolean | string;
}

export const RHFCode = <T extends FieldValues>({
  name,
  language,
  rules,
  control,
  errors,
  height = "500px",
  requiredFieldSymbol,
  label,
}: IRHFCodeProps<T>) => {
  const error = getFormErrorByPath(errors, name);

  let labelSymbol: string;
  if (requiredFieldSymbol) {
    if (typeof requiredFieldSymbol === "string") {
      labelSymbol = ` ${requiredFieldSymbol}`;
    } else if (typeof requiredFieldSymbol === "boolean") {
      labelSymbol = " *";
    }
  }

  return (
    <div>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <div className={`w-full border border-transparent overflow-hidden`}>
            {label && (
              <label
                htmlFor={name}
                className={
                  "block font-medium text-white text-sm leading-6 mb-2"
                }
              >
                {label}
                {labelSymbol}
              </label>
            )}
            <Editor
              theme={"vs-dark"}
              height={height}
              defaultLanguage={language}
              language={language}
              value={value}
              onChange={onChange}
              options={{
                minimap: {
                  enabled: false,
                },
                // editor: {
                //   // Disable drop shadow
                //   dropShadow: false,
                // },
              }}
            />
          </div>
        )}
      />
      <RHFFormHelperError error={error}></RHFFormHelperError>
    </div>
  );
};
