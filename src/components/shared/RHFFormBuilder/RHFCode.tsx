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
}

export const RHFCode = <T extends FieldValues>({
  name,
  language,
  rules,
  control,
  errors,
  height = "500px",
}: IRHFCodeProps<T>) => {
  const error = getFormErrorByPath(errors, name);

  return (
    <div>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <div className={`w-full border border-transparent overflow-hidden`}>
            <Editor
              className="z-0 rounded-md"
              theme={"vs-dark"}
              height={height}
              defaultLanguage={language}
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
