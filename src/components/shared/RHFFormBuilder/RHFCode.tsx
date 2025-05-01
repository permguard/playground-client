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
  checkboxNullable?: boolean;
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
  disabled,
  checkboxNullable,
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
          <div
            className={`w-full border border-transparent overflow-hidden items-center`}
          >
            <div className="flex gap-4 mb-2">
              {label && (
                <label
                  htmlFor={name}
                  className={"block font-medium text-white text-sm leading-6"}
                >
                  {label}
                  {labelSymbol}
                </label>
              )}
              {checkboxNullable ? (
                <input
                  id={`checkbox-${name}`}
                  name={`checkbox-${name}`}
                  checked={!(value === null || value === undefined)}
                  onChange={(e) => {
                    onChange(e.target.checked ? "" : null);
                  }}
                  type="checkbox"
                  className="h- my-auto sm:-mr-4 w-4 rounded text-fuchsia-500 focus:ring-fuchsia-500 bg-zinc-800 border-gray-900"
                />
              ) : null}
            </div>
            <Editor
              theme={"vs-dark"}
              height={height}
              defaultLanguage={language}
              language={language}
              value={value}
              onChange={onChange}
              loading={
                <div className="w-full h-full bg-[##272626] animate-pulse"></div>
              }
              options={{
                minimap: {
                  enabled: false,
                },
                readOnly: disabled,
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
