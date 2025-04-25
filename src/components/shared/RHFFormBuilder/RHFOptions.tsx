import React from "react";
import { Control, FieldErrors, FieldValues, Controller } from "react-hook-form";
import { classNames } from "@/utils/classNames";
import { getFormErrorByPath } from "./utils";
import { RHFFormHelperError } from "./RHFFormHelperError";

type SelectOptions = {
  label: string;
  value: string;
}[];

interface IRHFOptionsProps<T extends FieldValues> {
  id: string;
  name: string;
  label: React.ReactNode;
  errors: FieldErrors<FieldValues>;
  control: Control<T>;
  options: SelectOptions;
  labelId: string;
  translateOptions?: boolean;
  requiredFieldSymbol?: boolean | string;
}

export const RHFOptions = <T extends FieldValues>({
  name,
  label,
  errors,
  control,
  options,
  requiredFieldSymbol,
}: IRHFOptionsProps<T>) => {
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
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => {
        return (
          <div>
            <label
              htmlFor={name}
              className="block font-medium text-black text-[14px] sm:text-base"
            >
              {label}
              {labelSymbol}
            </label>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-between mt-2">
              {options.map((el) => (
                <button
                  key={el.value}
                  className={classNames(
                    "relative h-10 min-w-[100px] ring-[1px] rounded-md overflow-hidden focus:outline-none bg-[#8e8e9314]",
                    el.value === value
                      ? "ring-fuchsia-500 bg-fuchsia-500/25 ring-[2px]"
                      : "ring-gray-200"
                  )}
                  type="button"
                  onClick={() => {
                    onChange(el.value);
                  }}
                >
                  {el.label}
                </button>
              ))}
            </div>
            <div className="h-6 leading-6 m-0 p-0 flex">
              <RHFFormHelperError error={error} name={name} />
            </div>
          </div>
        );
      }}
    />
  );
};
