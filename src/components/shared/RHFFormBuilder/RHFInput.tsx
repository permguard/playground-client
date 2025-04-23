import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { getFormErrorByPath } from "./utils";
import { Icon } from "@iconify/react";
import { RHFFormHelperError } from "./RHFFormHelperError";
import { classNames } from "@/utils/classNames";
import { CopyButton } from "../CopyButton";

interface IRHFInputProps<T extends FieldValues> {
  name: string;
  icon?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  fullWidth?: boolean;
  ariaDescribedBy?: string;
  label: React.ReactNode;
  labelPlaceholder: string;
  control: Control<T>;
  errors: FieldErrors<FieldValues>;
  type?: React.InputHTMLAttributes<unknown>["type"];
  multiline?: boolean;
  rows?: string | number;
  disabled?: boolean;
  requiredFieldSymbol?: boolean | string;
  inputProps?: Partial<React.HTMLAttributes<HTMLInputElement>>;
  copy?: boolean;
  inputVariant?: "standart" | "expanded";
  // Available only in the expanded variant
  suffixText?: string;
  numericProps?: {
    min?: string;
    max?: string;
    step?: string;
  };
}

export const RHFInput = <T extends FieldValues>({
  name,
  rules,
  fullWidth = true,
  ariaDescribedBy,
  label,
  labelPlaceholder,
  control,
  errors,
  icon,
  multiline,
  rows,
  disabled,
  type = "text",
  requiredFieldSymbol,
  inputProps,
  copy,
  inputVariant = "standart",
  suffixText,
  numericProps,
}: IRHFInputProps<T>) => {
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
          <div>
            <label
              htmlFor={name}
              className={classNames(
                "block font-medium",
                inputVariant === "expanded"
                  ? "text-black text-[14px] sm:text-base"
                  : "text-white text-sm leading-6"
              )}
            >
              {label}
              {labelSymbol}
            </label>
            {type !== "textarea" ? (
              <div
                className={classNames(
                  inputVariant === "expanded"
                    ? `flex text-gray-900 items-center relative w-full ring-1 bg-[#8e8e9314] rounded-[12px] overflow-hidden focus-within:ring-2 focus-within:ring-fuchsia-500 mt-2 placeholder:text-black/25 ${
                        error !== undefined
                          ? "ring-red-500"
                          : "ring-transparent"
                      }`
                    : null,
                  inputVariant === "standart"
                    ? `${
                        icon ? "relative rounded-md shadow-sm" : null
                      } mt-2 flex flex-row justify-between`
                    : null
                )}
              >
                {icon ? (
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon={icon} aria-hidden="true" />
                  </div>
                ) : null}
                <input
                  {...inputProps}
                  disabled={disabled}
                  type={type}
                  name={name}
                  id={name}
                  value={value || ""}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    if (type === "number") {
                      onChange(newValue === "" ? "" : +newValue);
                    } else {
                      onChange(newValue);
                    }
                  }}
                  className={classNames(
                    inputVariant === "expanded"
                      ? `w-full text-[14px] sm:text-lg h-[49px] sm:h-[54px] border-none focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-400 pl-6`
                      : null,
                    inputVariant === "standart"
                      ? `block ${
                          fullWidth ? "w-full" : null
                        } rounded-md border-0 py-1.5 text-gray-900 ${
                          icon ? "pl-10" : null
                        } ${
                          error !== undefined ? "ring-red-500" : "ring-zinc-700"
                        } shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-fuchsia-500 sm:text-sm sm:leading-6 bg-[#424242]/50 placeholder-gray-400 text-white focus:border-blue-500`
                      : null,
                    inputProps?.className
                  )}
                  placeholder={labelPlaceholder}
                  min={numericProps ? numericProps.min : undefined}
                  max={numericProps ? numericProps.max : undefined}
                  step={numericProps ? numericProps.step : undefined}
                />
                {suffixText ? (
                  <p className="text-black/50 text-[14px] sm:text-lg mr-6 sm:mr-4">
                    {suffixText}
                  </p>
                ) : null}
                {copy ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CopyButton content={value} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                <div className="mt-2">
                  <textarea
                    disabled={disabled}
                    rows={
                      typeof rows == "string"
                        ? (rows as unknown as number)
                        : rows
                    }
                    aria-multiline={multiline}
                    name={name}
                    value={value || ""}
                    onChange={(event) => {
                      onChange(event.target.value);
                    }}
                    id={name}
                    className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-fuchsia-500 sm:text-sm sm:leading-6 bg-[#424242]/50 text-white focus:border-blue-500 ${
                      error !== undefined ? "ring-red-500" : "ring-zinc-700"
                    }`}
                    placeholder={labelPlaceholder}
                  />
                </div>
              </div>
            )}
            {ariaDescribedBy ? (
              <p
                className="mt-2 text-sm text-gray-500"
                id={`${name}-ariadescribedby`}
              >
                {ariaDescribedBy}
              </p>
            ) : null}
          </div>
        )}
      />
      {inputVariant === "expanded" ? (
        <div className="h-6 leading-6 m-0 p-0 flex">
          <RHFFormHelperError error={error} name={name} />
        </div>
      ) : (
        <RHFFormHelperError error={error} name={name} />
      )}
    </div>
  );
};
